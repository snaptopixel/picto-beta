import { Component, Element } from '@stencil/core';
import { css } from 'emotion';

const reset = css`
  all: initial;
`;

@Component({
  tag: 'picto-styled',
  styleUrl: 'bulma.css',
  scoped: true,
})
export class Styled {
  @Element() el: HTMLElement;

  observer: MutationObserver;
  applyStyle = (node: Element) => {
    const scopeId = (this.el as any)['s-sc'];
    if (!node.hasAttribute('no-style') && node.nodeName !== 'PICTO-RESET') {
      node.classList.add(scopeId);
      Array.from(node.children).map(this.applyStyle);
    } else if (node.hasAttribute('no-style')) {
      node.classList.add(reset);
    }
  };

  componentDidLoad() {
    const config = { attributes: false, childList: true, subtree: true };
    this.observer = new MutationObserver((mutationsList, observer) => {
      Array.from(this.el.children).map(this.applyStyle);
    });
    this.observer.observe(this.el, config);
    Array.from(this.el.children).map(this.applyStyle);
  }

  componentDidUnload() {
    this.observer.disconnect();
  }
}
