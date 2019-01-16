import { css } from 'emotion';
import frontMatter from 'front-matter';
import { kebabCase } from 'lodash-es';
var styles;
(function (styles) {
    styles.host = css `
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `;
    styles.menu = css `
    box-sizing: border-box;
    width: 250px;
    background: #eee;
    height: 100vh;
    padding: 1rem;
    overflow: auto;
  `;
    styles.body = css `
    box-sizing: border-box;
    flex: 1;
    padding: 3rem;
    padding-top: 2rem;
    overflow: auto;
    &:empty {
      display: none;
    }
  `;
})(styles || (styles = {}));
export class Graph {
    constructor() {
        this.pages = {};
    }
    parseLink(link, route = '') {
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
            }
            else {
                this.pages[link.page] = {
                    route: link.sref,
                    url: `${this.resourcesUrl}picto/pages/${link.page}.md`,
                };
            }
        }
        if (link.links) {
            link.links.map(sublink => this.parseLink(sublink, route));
        }
    }
    onNavLink({ detail: link }) {
        if (link.href) {
            window.open(link.href);
        }
    }
    async componentWillLoad() {
        const [manifest, content] = await Promise.all([
            fetch(this.resourcesUrl + 'picto/components.json').then(r => r.json()),
            fetch(this.resourcesUrl + 'picto/pages/index.md').then(r => r.text()),
        ]);
        const config = frontMatter(content);
        const nav = config.attributes;
        this.indexSrc = config.body;
        const grouped = {};
        nav.push({ label: 'Components' });
        const ungrouped = {
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
                        links: [],
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
            }
            else {
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
                vdom: h("picto-graph-index", { menu: value }),
            };
        });
        this.menuOptions = nav;
    }
    render() {
        return [
            h("stencil-router", { class: styles.host },
                h("picto-menu", { class: styles.menu, options: this.menuOptions }),
                h("stencil-route", { url: '/', exact: true, class: styles.body, component: 'picto-markdown', componentProps: { source: this.indexSrc } }),
                Object.entries(this.pages).map(([name, { route, url, source, vdom }]) => (h("stencil-route", { url: route, class: styles.body, exact: true, routeRender: () => vdom || h("picto-markdown", { url: url, source: source }) })))),
        ];
    }
    static get is() { return "picto-graph"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "resourcesUrl": {
            "context": "resourcesUrl"
        }
    }; }
    static get listeners() { return [{
            "name": "linkClicked",
            "method": "onNavLink"
        }]; }
}
