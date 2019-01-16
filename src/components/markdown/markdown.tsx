import { Component, Element, Prop } from '@stencil/core';
import { css } from 'emotion';
import Yaml from 'js-yaml';
import Marked from 'marked';

Marked.setOptions({ breaks: true });

const renderer = new Marked.Renderer();
let scope: any;

const code: {
  [lang: string]: (src: string, lang: string, isEscaped: boolean) => string;
} = {
  yaml(src) {
    scope = Yaml.load(src);
    return '';
  },
  html(src, lang, isEscaped) {
    return `<picto-preview source='${escape(src)}'></picto-preview>`;
  },
  default: renderer.code,
};

renderer.code = (source: string, lang: string, isEscaped: boolean) => {
  if (!code[lang]) {
    lang = 'default';
  }
  return code[lang](source, lang, isEscaped);
};

namespace styles {
  export const main = css`
    display: block;
    font-size: 14px;
    line-height: 1;
  `;
}

@Component({
  tag: 'picto-markdown',
})
export class Markdown {
  @Element() el: HTMLElement;

  @Prop({ context: 'resourcesUrl' }) resourcesUrl: string;
  /** The markdown to be rendered */
  @Prop({ mutable: true }) source: string;

  @Prop() url: string;

  async componentWillLoad() {
    if (this.url) {
      this.source = await fetch(this.url).then(r => r.text());
    }
  }

  render() {
    const src = Marked.parse(this.source, { renderer });
    return (
      <picto-styled
        class={styles.main}
        innerHTML={`<div class='content'>${src}</div>`}
      />
    );
  }
}
