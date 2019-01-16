import { css } from 'emotion';
const reset = css `
  all: initial;
`;
export class Styled {
    componentDidLoad() {
        const scopeId = this.el['s-sc'];
        function applyStyle(node) {
            if (!node.hasAttribute('no-style') && node.nodeName !== 'PICTO-RESET') {
                node.classList.add(scopeId);
                Array.from(node.children).map(applyStyle);
            }
            else if (node.hasAttribute('no-style')) {
                node.classList.add(reset);
            }
        }
        Array.from(this.el.children).map(applyStyle);
    }
    static get is() { return "picto-styled"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:picto-styled:**/"; }
}
