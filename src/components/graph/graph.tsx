import { css } from '@/styles';
import { Component, Element, Listen, Prop } from '@stencil/core';
import { VNode } from '@stencil/core/dist/declarations';
import '@stencil/router';
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

  menuOptions: Array<IMenu | ILink>;
  pages: {
    [name: string]: {
      route?: string;
      source?: string;
      url?: string;
      vdom?: VNode | VNode[];
    };
  } = {};
  indexSrc: string;

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
        this.pages[link.page].route = link.sref;
      } else {
        this.pages[link.page] = {
          route: link.sref,
          url: `${this.resourcesUrl}pages/${link.page}.md`,
        };
      }
    }
    if (link.links) {
      link.links.map(sublink => this.parseLink(sublink, route));
    }
  }

  @Listen('linkClicked')
  onNavLink({ detail: link }: CustomEvent<ILink>) {
    if (link.href) {
      window.open(link.href);
    }
  }

  async componentWillLoad() {
    const [manifest, content] = await Promise.all<IComponentManifest, string>([
      fetch(this.resourcesUrl + 'components.json').then(r => r.json()),
      fetch(this.resourcesUrl + 'pages/index.md').then(r => r.text()),
    ]);
    const config = frontMatter(content);
    const nav = config.attributes as Array<IMenu | ILink>;
    this.indexSrc = config.body;

    nav.unshift(
      { label: 'Pages' },
      {
        label: 'Home',
        links: [{ icon: 'home', label: 'Home', sref: '/' }],
      },
    );

    const grouped: { [name: string]: IMenu } = {};

    nav.push({ label: 'Components' });

    const ungrouped: IMenu = {
      links: [],
    };

    manifest.components.map(component => {
      const { attributes, body } = frontMatter(component.readme);
      if (attributes.hide) {
        return;
      }
      this.pages[component.tag] = {
        source: body,
      };
      if (attributes.group) {
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
      } else {
        ungrouped.links.push({
          label: component.tag,
          page: component.tag,
        });
      }
    });

    if (ungrouped.links.length) {
      nav.push(ungrouped);
    }

    nav.map(l => this.parseLink(l));

    Object.entries(grouped).map(([key, value]) => {
      this.pages[key] = {
        route: value.sref,
        vdom: <picto-graph-index menu={value} />,
      };
    });

    this.menuOptions = nav;
  }
  render() {
    return [
      <stencil-router class={styles.host}>
        <picto-menu class={styles.menu} options={this.menuOptions} />
        <stencil-route
          url='/'
          exact={true}
          class={styles.body}
          component='picto-markdown'
          componentProps={{ source: this.indexSrc }}
        />
        {Object.entries(this.pages).map(
          ([name, { route, url, source, vdom }]) => (
            <stencil-route
              url={route}
              class={styles.body}
              exact={true}
              routeRender={() =>
                vdom || <picto-markdown url={url} source={source} />
              }
            />
          ),
        )}
      </stencil-router>,
    ];
  }
}
