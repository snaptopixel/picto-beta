import { Component, Prop } from '@stencil/core';
import { injectGlobal } from 'emotion';

const icons = injectGlobal`
  @import url('https://use.fontawesome.com/releases/v5.6.1/css/all.css');
`;

@Component({
  tag: 'picto-icon',
})
export class Icon {
  @Prop() name: string;
  @Prop() styleType: 'solid' | 'regular' | 'brand' = 'solid';

  styleClasses = {
    solid: 'fas',
    regular: 'far',
    brand: 'fab',
  };
  render() {
    return [
      <span class='icon'>
        <i class={`${this.styleClasses[this.styleType]} fa-${this.name}`} />
      </span>,
    ];
  }
}
