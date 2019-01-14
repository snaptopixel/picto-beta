import { Component, Element, Listen, Prop } from '@stencil/core';
import { css } from 'emotion';

namespace styles {
  const fullSize = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `;
  const shadow = (position: 'top' | 'bottom') => css`
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

  export const component = css`
    display: block;
    position: relative;
  `;

  export const content = css`
    ${fullSize};
    overflow: auto;
  `;

  export const overlay = css`
    pointer-events: none;
    ${fullSize};
    &:before {
      ${shadow('top')};
    }
    &:after {
      ${shadow('bottom')};
    }
  `;
}

@Component({
  tag: 'picto-scrollarea',
})
export class ScrollArea {
  @Element() el: HTMLPictoScrollareaElement;
  scrollEl: HTMLDivElement;

  scrollListener = () => {
    requestAnimationFrame(this.trackScrolling);
  };

  trackScrolling = () => {
    const st = this.scrollEl.scrollTop;
    const ch = this.scrollEl.clientHeight;
    const sh = this.scrollEl.scrollHeight;
    this.setAttr('scroll-top', st > 0);
    this.setAttr('scroll-bottom', sh - st !== ch);
  };

  setAttr(attr: string, value: boolean) {
    if (value) {
      this.el.setAttribute(attr, '');
    } else {
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
      <div
        ref={e => (this.scrollEl = e)}
        onScroll={this.scrollListener}
        class={styles.content}
      >
        <slot />
      </div>,
      <div class={styles.overlay} />,
    ];
  }
}
