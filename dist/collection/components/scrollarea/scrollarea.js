import { css } from 'emotion';
var styles;
(function (styles) {
    const fullSize = css `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `;
    const shadow = (position) => css `
    content: '';
    opacity: 0;
    transition: opacity linear 100ms;
    position: absolute;
    width: 100%;
    height: 10px;
    ${position}: 0;
    background: linear-gradient(
      to ${position},
      transparent,
      rgba(0, 0, 0, 0.1)
    );
    [scroll-${position}] & {
      opacity: 1;
    }
  `;
    styles.component = css `
    display: block;
    position: relative;
  `;
    styles.content = css `
    ${fullSize};
    overflow: auto;
  `;
    styles.overlay = css `
    pointer-events: none;
    ${fullSize};
    &:before {
      ${shadow('top')};
    }
    &:after {
      ${shadow('bottom')};
    }
  `;
})(styles || (styles = {}));
export class ScrollArea {
    constructor() {
        this.scrollListener = () => {
            requestAnimationFrame(this.trackScrolling);
        };
        this.trackScrolling = () => {
            const st = this.scrollEl.scrollTop;
            const ch = this.scrollEl.clientHeight;
            const sh = this.scrollEl.scrollHeight;
            this.setAttr('scroll-top', st > 0);
            this.setAttr('scroll-bottom', sh - st !== ch);
        };
    }
    setAttr(attr, value) {
        if (value) {
            this.el.setAttribute(attr, '');
        }
        else {
            this.el.removeAttribute(attr);
        }
    }
    componentDidLoad() {
        this.trackScrolling();
    }
    hostData() {
        return {
            class: styles.component,
        };
    }
    render() {
        return [
            h("div", { ref: e => (this.scrollEl = e), onScroll: this.scrollListener, class: styles.content },
                h("slot", null)),
            h("div", { class: styles.overlay }),
        ];
    }
    static get is() { return "picto-scrollarea"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
}
