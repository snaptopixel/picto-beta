import { Component, Prop } from '@stencil/core';
import classes from 'classnames';
import { css } from 'emotion';

namespace styles {
  export const table = classes(
    'table',
    css`
      width: 100%;
      td {
        padding: 0;
        vertical-align: middle;
      }
      td:first-of-type {
        padding-left: 0.5rem;
        width: 25%;
      }
      .hljs {
        margin: -0.5rem;
      }
    `,
  );
  export const tip = classes(
    'has-text-info',
    'has-text-grey-light',
    css`
      position: absolute;
      margin-top: -0.5em;
    `,
  );
}

@Component({
  tag: 'picto-preview-events',
})
export class Events {
  @Prop() events: CustomEvent[];
  render() {
    return [
      <picto-styled>
        <table class={styles.table}>
          <tr>
            <th>Event</th>
            <th>Detail</th>
          </tr>
          {this.events.map(e => (
            <tr>
              <td>{e.type}</td>
              <td>
                <picto-code source={JSON.stringify(e.detail)} lang='js' />
              </td>
            </tr>
          ))}
        </table>
      </picto-styled>,
    ];
  }
}
