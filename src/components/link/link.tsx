import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'picto-link',
})
export class Link {
  @Element() el: HTMLElement;
  /** Notifies app to navigate to a page or component */
  @Event() linkClicked: EventEmitter<string>;
  /** Page id or component name */
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
