import * as resource from '@/components/graph/resource';
import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { VNode } from '@stencil/core/dist/declarations';
import { RouterHistory } from '@stencil/router';
import { css } from 'emotion';
import frontMatter from 'front-matter';
import { kebabCase } from 'lodash-es';

namespace styles {
  export const host = css`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `;
  export const menu = css`
    box-sizing: border-box;
    width: 250px;
    background: #eee;
    height: 100vh;
    padding: 1rem;
    overflow: auto;
  `;
  export const body = css`
    box-sizing: border-box;
    flex: 1;
    padding: 3rem;
    padding-top: 2rem;
    overflow: auto;
    &:empty {
      display: none;
    }
  `;
}

@Component({
  tag: 'picto-graph',
})
export class Graph {
  @Element() el: HTMLElement;

  @Prop({ context: 'resourcesUrl' }) resourcesUrl: string;

  @State() menuOptions: Array<IMenu | ILink>;
  @State() indexSrc: string;

  pages: {
    [name: string]: {
      route?: string;
      source?: string;
      url?: string;
      vdom?: VNode | VNode[];
      component?: IComponentMeta;
    };
  } = {};

  history: RouterHistory;
  indexRaw: string;

  setManifest = (data: IComponentManifest) => {
    this.manifest = data;
    this.parseManifest();
  };

  setIndex = (data: string) => {
    this.indexRaw = data;
    this.parseManifest();
  };

  manifest: IComponentManifest;

  parseLink(link: IMenu, route = '') {
    if (link.href || (!link.links && Object.keys(link).length === 1)) {
      return;
    }
    const path = link.page || kebabCase(link.label);
    if (path) {
      route += '/' + path;
    }
    if (!link.sref) {
      link.sref = route;
    }
    if (link.page) {
      if (this.pages[link.page]) {
        if (this.pages[link.page].route) {
          throw new Error(
            `[picto] pages must have a unique name, ${
              link.page
            } already exists!`,
          );
        }
        this.pages[link.page].route = link.sref;
      } else {
        this.pages[link.page] = {
          route: link.sref,
          url: `${this.resourcesUrl}pages/${route}.md`,
        };
      }
    }
    if (link.links) {
      link.links.map(sublink => this.parseLink(sublink, route));
    }
  }

  parseManifest() {
    if (!this.indexRaw || !this.manifest) {
      return;
    }

    const config = frontMatter<{ labels: any; menu: IMenu[] }>(this.indexRaw);
    const { labels, menu } = config.attributes;

    this.pages = {};
    this.indexSrc = config.body;

    const grouped: { [name: string]: IMenu } = {};

    menu.push({ label: labels.menu.components });

    const ungrouped: IMenu = {
      links: [],
    };

    this.manifest.components.map(component => {
      const { attributes, body } = frontMatter(component.readme);
      if (attributes.hide) {
        return;
      }
      this.pages[component.tag] = {
        source: body,
        component,
      };
      if (!attributes.group) {
        attributes.group = labels.menu.ungrouped;
      }
      if (!grouped[attributes.group]) {
        grouped[attributes.group] = {
          label: attributes.group,
          links: [] as ILink[],
          icon: 'archive',
          components: [],
        };
        ungrouped.links.push(grouped[attributes.group]);
      }
      grouped[attributes.group].components.push(component);
      grouped[attributes.group].links.push({
        label: component.tag,
        icon: 'puzzle-piece',
        preview: attributes.preview || {},
        page: component.tag,
      });
    });

    if (ungrouped.links.length) {
      menu.push(ungrouped);
    }

    ungrouped.links.sort((a: any, b: any) => {
      if (a.links && b.links) {
        if (a.label.toUpperCase() < b.label.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      } else if (!a.links && b.links) {
        return 1;
      } else if (a.links && !b.links) {
        return -1;
      }
    });

    menu.map(l => this.parseLink(l));

    Object.entries(grouped).map(([key, value]) => {
      this.pages[kebabCase(key)] = {
        route: value.sref,
        vdom: <picto-graph-index menu={value} />,
      };
    });

    this.menuOptions = menu;
  }

  @Listen('navLinkClicked')
  onNavLink({ detail: link }: CustomEvent<ILink>) {
    if (link.href) {
      window.open(link.href);
    }
  }

  @Listen('linkClicked')
  onLinkClicked({ detail: to }: CustomEvent<string>) {
    this.history.push(this.pages[to].route);
  }

  async componentWillLoad() {
    const allResources = await Promise.all([
      resource.open(this.resourcesUrl + 'config.json', this.setManifest),
      resource.open(this.resourcesUrl + 'pages/index.md', this.setIndex),
    ]);
    return allResources;
  }

  componentDidUnload() {
    resource.close(this.resourcesUrl + 'config.json');
    resource.close(this.resourcesUrl + 'pages/index.md');
  }

  render() {
    return [
      <stencil-router class={styles.host}>
        <stencil-route
          url='/'
          routeRender={({ history }) => (this.history = history)}
        />
        <picto-menu class={styles.menu} options={this.menuOptions} />
        <stencil-route
          url='/'
          exact={true}
          class={styles.body}
          component='picto-markdown'
          componentProps={{ source: this.indexSrc }}
        />
        {Object.entries(this.pages).map(
          ([name, { route, url, source, vdom, component }]) => (
            <stencil-route
              url={route}
              class={styles.body}
              exact={true}
              routeRender={() =>
                vdom || (
                  <picto-markdown
                    url={url}
                    source={source}
                    component={component}
                  />
                )
              }
            />
          ),
        )}
      </stencil-router>,
    ];
  }
}
