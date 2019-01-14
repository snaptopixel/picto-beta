import { css } from '@/styles';
import { Component, Prop } from '@stencil/core';

const icons = css`
  @import url('https://use.fontawesome.com/releases/v5.6.1/css/all.css');
`;

@Component({
  tag: 'picto-icon',
})
export class Icon {
  @Prop() name: string;
  @Prop() styleType: 'solid' | 'regular' = 'solid';

  styleClasses = {
    solid: 'fas',
    regular: 'far',
  };
  render() {
    return [
      <span class='icon'>
        <i class={`${this.styleClasses[this.styleType]} fa-${this.name}`} />
      </span>,
    ];
  }
}
