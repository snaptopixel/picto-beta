import { If } from '@/directives/if';
import { Component, Prop, State, Watch } from '@stencil/core';
import { VNode } from '@stencil/core/dist/declarations';
import { css } from 'emotion';

const styles = {
  input: css`
    & + & {
      margin-top: 10px;
    }
  `,
};

@Component({ tag: 'picto-props-menu' })
export class PropsMenu {
  @Prop() props: IPreviewProp[] = [];

  wrapControl(name: string, ...controls: VNode[]) {
    return (
      <div class='field has-addons is-expanded'>
        <div class='control'>
          <a
            class='button is-static is-small'
            style={{
              fontWeight: 'bold',
            }}
          >
            {name}
          </a>
        </div>
        <div class='control is-expanded'>{controls[0]}</div>
        {controls.slice(1)}
      </div>
    );
  }

  renderControl(name: string, type: string, value: any) {
    switch (type) {
      case 'string':
        return this.wrapControl(
          name,
          <input class='input is-small' type='text' value={value} />,
        );
      case 'number':
        return this.wrapControl(
          name,
          <input class='input is-small' type='number' value={value} />,
        );
      case 'boolean':
        return this.wrapControl(
          name,
          <div class='select is-small' style={{ display: 'block' }}>
            <select style={{ width: '100%' }}>
              <option selected={!value}>false</option>
              <option selected={value}>true</option>
            </select>
          </div>,
        );
      default:
        if (type.match(/".*\| "/)) {
          const values = type.replace(/"/g, '').split(' | ');
          return this.wrapControl(
            name,
            <div class='select is-small' style={{ display: 'block' }}>
              <select style={{ width: '100%' }}>
                {values.map(val => (
                  <option selected={val === value}>{val}</option>
                ))}
              </select>
            </div>,
          );
        } else {
          return this.wrapControl(
            name,
            <a class='button is-small is-static' style={{ width: '100%' }}>
              <picto-icon
                name='exclamation-triangle'
                style={{ marginRight: '8px' }}
              />
              Type is not editable by Picto
            </a>,
          );
        }
    }
  }

  render() {
    return (
      <picto-styled>
        <div
          class='box'
          style={{ padding: '0', paddingBottom: '10px', overflow: 'hidden' }}
        >
          <table class='table is-fullwidth' style={{ marginBottom: '0' }}>
            <thead>
              <tr>
                <th>
                  <picto-icon class='has-text-link' name='cogs' />
                  &nbsp;Props
                </th>
              </tr>
            </thead>
          </table>
          <div style={{ padding: '10px 10px' }}>
            <picto-scrollarea
              style={{
                height: '160px',
                width: '250px',
              }}
            >
              {this.props.map(({ name, value, type }) => (
                <div class={styles.input}>
                  {this.renderControl(name, type, value)}
                </div>
              ))}
            </picto-scrollarea>
          </div>
        </div>
      </picto-styled>
    );
  }
}
