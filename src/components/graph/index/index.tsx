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
  row: css`
    td {
      font-size: 0.8em !important;
      vertical-align: middle !important;
    }
    td:first-of-type {
      font-family: 'Roboto Mono';
      white-space: nowrap;
      width: 15%;
    }
    td:nth-of-type(2) {
      width: 33%;
      code {
        margin-left: 0.5em;
        display: inline-block;
        line-height: 1em;
        font-size: 0.6em;
        vertical-align: middle;
        margin-top: -0.3em;
        border-radius: 4px;
        color: #999;
        font-family: 'Roboto Mono';
      }
      strong {
        font-family: 'Roboto Mono' !important;
      }
    }
    td:nth-of-type(3) {
      padding: 0.3em;
      background-color: white;
      ${checkerboard(20, 'rgba(0, 0, 0, .05)')};
    }
    ul {
      margin: 1em !important;
      li + li {
        margin-top: 0.4em !important;
      }
    }
  `,
  docs: css`
    margin-top: 0.3em;
    color: #999;
  `,
  wrapper: css`
    &:empty {
      &:before {
        content: 'No Preview';
        display: block;
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
        <table class='table' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Props</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {this.menu.components.map((c, index) => {
              const CustomTag = c.tag;
              const { innerHTML, props } = this.menu.links[index].preview;
              return (
                <tr class={styles.row}>
                  <td>
                    <stencil-route-link url={this.menu.sref + '/' + c.tag}>
                      {c.tag}
                    </stencil-route-link>
                  </td>
                  <td class='content'>
                    <ul>
                      {c.props.map(p => (
                        <li>
                          <strong>{p.name}</strong>
                          <code>{p.type}</code>
                          {p.docs && <div class={styles.docs}>{p.docs}</div>}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <div class={styles.wrapper}>
                      {(innerHTML || props) && (
                        <div no-style>
                          <CustomTag {...props}>{innerHTML}</CustomTag>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </picto-styled>
    );
  }
}
