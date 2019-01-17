import { css } from 'emotion';
const styles = {
    title: css `
    margin-bottom: 0.5em !important;
  `,
    link: css `
    padding: 6px 2px !important;
    &.is-active picto-icon {
      color: white !important;
    }
  `,
};
export class Menu {
    constructor() {
        this.options = [];
    }
    renderLink(link, showActive = true) {
        return link.sref ? (h("stencil-route-link", { url: link.sref, exact: true, activeClass: showActive ? 'is-active' : '', anchorClass: styles.link, onClick: e => {
                this.navLinkClicked.emit(link);
            } },
            link.links && (h("picto-icon", { name: link.icon || 'book', styleType: link.iconStyle || 'solid', style: { float: 'left', marginTop: '-5px' }, class: 'has-text-grey-light' })),
            !link.links && (h("picto-icon", { name: link.icon || 'file-alt', styleType: link.iconStyle || 'solid', style: { float: 'left', marginTop: '-5px' }, class: 'has-text-grey-light' })),
            link.label)) : (h("a", { class: styles.link, href: link.href, onClick: e => {
                if (e.button === 0 &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey &&
                    !e.metaKey) {
                    e.preventDefault();
                    this.navLinkClicked.emit(link);
                }
            } },
            h("picto-icon", { style: { float: 'left', marginTop: '-5px' }, class: 'has-text-grey-light', name: link.icon || 'link', styleType: link.iconStyle || 'solid' }),
            link.label));
    }
    render() {
        return [
            h("picto-styled", null,
                h("aside", { class: 'menu is-size-7' },
                    h("ul", { class: 'menu-list' },
                        h("li", null, this.options.map((opt) => {
                            if (!opt.links) {
                                return (h("p", { class: `menu-label ${styles.title}` }, opt.label));
                            }
                            else {
                                return opt.links.map((link) => {
                                    if (link.links) {
                                        return (h("li", null,
                                            this.renderLink(link),
                                            h("stencil-route", { url: link.sref, routeRender: () => (h("picto-styled", null,
                                                    h("ul", null, link.links.map((sublink) => {
                                                        return this.renderLink(sublink);
                                                    })))) })));
                                    }
                                    else {
                                        return h("li", null, this.renderLink(link));
                                    }
                                });
                            }
                        }))))),
        ];
    }
    static get is() { return "picto-menu"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "options": {
            "type": "Any",
            "attr": "options"
        },
        "selectedLink": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "navLinkClicked",
            "method": "navLinkClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
