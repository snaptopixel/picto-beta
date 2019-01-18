import { Component, Prop } from '@stencil/core';
import Bricks from 'bricks.js';
import classnames from 'classnames';
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
  card: css`
    width: 320px;
  `,
};

@Component({
  tag: 'picto-graph-index',
})
export class Index {
  @Prop() menu: IMenu;
  bricksEl: HTMLDivElement;
  componentDidLoad() {
    const instance = Bricks({
      container: this.bricksEl,
      packed: 'packed',
      sizes: [
        { mq: '768px', columns: 1, gutter: 20 },
        { mq: '1010px', columns: 2, gutter: 20 },
        { mq: '1360px', columns: 3, gutter: 20 },
        { mq: '1700px', columns: 4, gutter: 20 },
      ],
    });
    instance.pack();
    instance.resize(true);
  }
  render() {
    return (
      <picto-styled>
        <div class='content'>
          <h1>
            <picto-icon class='has-text-link' name={this.menu.icon} />
            &nbsp;&nbsp;{this.menu.label}
          </h1>
        </div>
        <div ref={el => (this.bricksEl = el)}>
          {this.menu.components.map((c, index) => {
            const CustomTag = c.tag;
            const { innerHTML, props, style } = this.menu.links[index].preview;
            return (
              <div class={classnames('card', styles.card)}>
                <div class={`card-image ${styles.preview}`}>
                  {(innerHTML || props) && (
                    <div
                      no-style
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <CustomTag style={style} {...props}>
                        {innerHTML}
                      </CustomTag>
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
        </div>
      </picto-styled>
    );
  }
}
