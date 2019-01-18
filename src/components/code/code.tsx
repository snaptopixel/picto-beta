import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';
import hljs from 'highlight.js';

const styles = {
  main: css`
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700');
    @import url('https://unpkg.com/highlight.js@9.13.1/styles/github.css');
    font-family: 'Roboto Mono', monospace !important;
    line-height: 1.5 !important;
    [inline] & {
      padding: 0 !important;
      background: none;
    }
  `,
};

@Component({
  tag: 'picto-code',
})
export class Code {
  /** Source code as a string */
  @Prop() source: string;
  /** Language for highlighting */
  @Prop() lang: string = 'html';
  /** Display inline without padding or bg color */
  @Prop({ reflectToAttr: true }) inline: boolean;

  srcEl: HTMLPreElement;

  componentDidLoad() {
    this.srcEl.innerText = this.source;
    this.srcEl.classList.add(this.lang);
    hljs.highlightBlock(this.srcEl);
  }

  render() {
    return <pre class={styles.main} ref={el => (this.srcEl = el)} />;
  }
}
