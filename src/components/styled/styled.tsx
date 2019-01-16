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
  componentDidLoad() {
    const scopeId = (this.el as any)['s-sc'];
    function applyStyle(node: Element) {
      if (!node.hasAttribute('no-style') && node.nodeName !== 'PICTO-RESET') {
        node.classList.add(scopeId);
        Array.from(node.children).map(applyStyle);
      } else if (node.hasAttribute('no-style')) {
        node.classList.add(reset);
      }
    }
    Array.from(this.el.children).map(applyStyle);
  }
}
