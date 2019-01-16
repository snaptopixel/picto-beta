import { css } from 'emotion';
import hljs from 'highlight.js';
var styles;
(function (styles) {
    styles.main = css `
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700');
    @import url('https://unpkg.com/highlight.js@9.13.1/styles/github.css');
    font-family: 'Roboto Mono', monospace !important;
    line-height: 1.5 !important;
  `;
})(styles || (styles = {}));
export class Code {
    constructor() {
        this.lang = 'html';
    }
    componentDidLoad() {
        this.srcEl.innerText = this.source;
        this.srcEl.classList.add(this.lang);
        hljs.highlightBlock(this.srcEl);
    }
    render() {
        return h("pre", { class: styles.main, ref: el => (this.srcEl = el) });
    }
    static get is() { return "picto-code"; }
    static get properties() { return {
        "lang": {
            "type": String,
            "attr": "lang"
        },
        "source": {
            "type": String,
            "attr": "source"
        }
    }; }
}
