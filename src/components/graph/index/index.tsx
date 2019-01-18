import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';

function checkerboard(boxSize: number, boxColor: string) {
  return css`
    background-image: ${[
      `linear-gradient(45deg, ${boxColor} 25%, transparent 25%, transparent 75%, ${boxColor} 75%, ${boxColor})`,
      `linear-gradient(45deg, ${boxColor} 25%, transparent 25%, transparent 75%, ${boxColor} 75%, ${boxColor})`,
    ].join(', ')};
    background-size: ${boxSize}px ${boxSize}px;
    background-position: 0 0, ${boxSize / 2}px ${boxSize / 2}px;
  `;
}

const styles = {
  preview: css`
    padding: 20px;
    background-color: white;
    ${checkerboard(20, 'rgba(0, 0, 0, .05)')};
    &:empty {
      &:before {
        content: 'No Preview';
        display: block;
        padding: 20px;
        text-align: center;
        color: #999 !important;
        font-style: italic;
      }
    }
  `,
};

@Component({
  tag: 'picto-graph-index',
})
export class Index {
  @Prop() menu: IMenu;
  render() {
    return (
      <picto-styled>
        <div class='content'>
          <h1>
            <picto-icon class='has-text-link' name={this.menu.icon} />
            &nbsp;&nbsp;{this.menu.label}
          </h1>
        </div>

        {this.menu.components.map((c, index) => {
          const CustomTag = c.tag;
          const { innerHTML, props } = this.menu.links[index].preview;
          return (
            <div class='card' style={{ marginBottom: '30px' }}>
              <div class={`card-image ${styles.preview}`}>
                {(innerHTML || props) && (
                  <div no-style>
                    <CustomTag {...props}>{innerHTML}</CustomTag>
                  </div>
                )}
              </div>
              <div class='card-content'>
                <div class='content'>
                  <stencil-route-link url={this.menu.sref + '/' + c.tag}>
                    <picto-icon name='puzzle-piece' />
                    &nbsp;&nbsp;{c.tag}
                  </stencil-route-link>
                </div>
              </div>
            </div>
          );
        })}
      </picto-styled>
    );
  }
}
