import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';

const styles = {
  table: css`
    td {
      font-size: 0.8em;
      &:first-of-type {
        padding-left: 1em;
        width: 25%;
      }
    }
    tbody:empty {
      &:before {
        content: 'No Events Received';
        display: block;
        font-style: italic;
        color: #999;
        margin: 20px;
      }
    }
    tr:nth-child(even) {
      background: hsl(0, 0%, 96%);
    }
  `,
};

@Component({
  tag: 'picto-preview-events',
})
export class Events {
  @Prop() events: IComponentEvent[];
  render() {
    return [
      <picto-styled>
        <table class={styles.table}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {this.events.map(e => (
              <tr>
                <td>{e.when.toLocaleString()}</td>
                <td>
                  <picto-code
                    inline
                    source={JSON.stringify(
                      { event: e.event, detail: e.detail },
                      null,
                      2,
                    )}
                    lang='ts'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </picto-styled>,
    ];
  }
}
