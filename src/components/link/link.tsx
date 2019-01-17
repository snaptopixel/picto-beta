import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'picto-link',
})
export class Link {
  @Element() el: HTMLElement;
  @Event() linkClicked: EventEmitter<string>;
  @Prop() to: string;

  onClick = (e: UIEvent) => {
    e.preventDefault();
    this.linkClicked.emit(this.to);
  };

  render() {
    return (
      <a href='' onClick={this.onClick}>
        <slot />
      </a>
    );
  }
}
