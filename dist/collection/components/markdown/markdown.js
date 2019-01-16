import { css } from 'emotion';
import Yaml from 'js-yaml';
import Marked from 'marked';
Marked.setOptions({ breaks: true });
const renderer = new Marked.Renderer();
let scope;
const code = {
    yaml(src) {
        scope = Yaml.load(src);
        return '';
    },
    html(src, lang, isEscaped) {
        return `<picto-preview source='${escape(src)}'></picto-preview>`;
    },
    default: renderer.code,
};
renderer.code = (source, lang, isEscaped) => {
    if (!code[lang]) {
        lang = 'default';
    }
    return code[lang](source, lang, isEscaped);
};
var styles;
(function (styles) {
    styles.main = css `
    display: block;
    font-size: 14px;
    line-height: 1;
  `;
})(styles || (styles = {}));
export class Markdown {
    async componentWillLoad() {
        if (this.url) {
            this.source = await fetch(this.url).then(r => r.text());
        }
    }
    render() {
        const src = Marked.parse(this.source, { renderer });
        return (h("picto-styled", { class: styles.main, innerHTML: `<div class='content'>${src}</div>` }));
    }
    static get is() { return "picto-markdown"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "resourcesUrl": {
            "context": "resourcesUrl"
        },
        "source": {
            "type": String,
            "attr": "source",
            "mutable": true
        },
        "url": {
            "type": String,
            "attr": "url"
        }
    }; }
}
