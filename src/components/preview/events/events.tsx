import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'picto-preview-events',
})
export class Events {
  @Prop() events: IComponentEvent[];
  render() {
    return [
      <picto-styled>
        <table class='table is-fullwidth is-striped is-narrow'>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Time</th>
              <th style={{ width: '25%' }}>Event</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {this.events.map(e => (
              <tr>
                <td>{e.when.toLocaleString()}</td>
                <td>{e.event}</td>
                <td>
                  <picto-code
                    inline
                    source={JSON.stringify(e.detail, null, 2)}
                    lang='js'
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
