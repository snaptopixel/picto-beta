import { Component, Element, Prop } from '@stencil/core';
import { css } from 'emotion';
import Marked from 'marked';

Marked.setOptions({ breaks: true });

const renderer = new Marked.Renderer();
let previewProps = '';

const code: {
  [lang: string]: (src: string, lang: string, isEscaped: boolean) => string;
} = {
  yaml(src) {
    previewProps = src;
    return '';
  },
  html(src, lang, isEscaped) {
    const value = `<picto-preview source='${escape(src)}' props='${escape(
      previewProps,
    )}'></picto-preview>`;
    previewProps = '';
    return value;
  },
  default: renderer.code,
};

renderer.code = (source: string, lang: string, isEscaped: boolean) => {
  if (!code[lang]) {
    lang = 'default';
  }
  return code[lang](source, lang, isEscaped);
};

namespace styles {
  export const main = css`
    display: block;
    font-size: 14px;
    line-height: 1;
  `;
}

@Component({
  tag: 'picto-markdown',
})
export class Markdown {
  @Element() el: HTMLElement;

  @Prop({ context: 'resourcesUrl' }) resourcesUrl: string;
  /** The markdown to be rendered */
  @Prop({ mutable: true }) source: string;
  @Prop() component: IComponentMeta;

  @Prop() url: string;

  async componentWillLoad() {
    if (this.url) {
      this.source = await fetch(this.url).then(r => r.text());
    }
  }

  componentDidLoad() {
    if (this.component) {
      const previews = Array.from(this.el.querySelectorAll('picto-preview'));
      previews.map(p => {
        p.component = this.component;
      });
    }
  }

  render() {
    const src = Marked.parse(this.source, { renderer });
    const readme = (
      <picto-styled
        class={styles.main}
        innerHTML={`<div class='content'>${src}</div>`}
      />
    );

    const content = [readme];

    if (this.component) {
      const props = (
        <picto-styled style={{ display: 'block', marginTop: '30px' }}>
          <div class='content'>
            <h5>
              <picto-icon class='has-text-link' name='sliders-h' />
              &nbsp;&nbsp;Props
            </h5>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '25%' }}>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.component.props.map(p => (
                  <tr>
                    <td>{p.name}</td>
                    <td>
                      <code>{p.type}</code>
                    </td>
                    <td>{p.docs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </picto-styled>
      );

      const events = (
        <picto-styled style={{ display: 'block', marginTop: '30px' }}>
          <div class='content'>
            <h5>
              <picto-icon class='has-text-link' name='broadcast-tower' />
              &nbsp;&nbsp;Events
            </h5>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Event</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {this.component.events.map(e => (
                  <tr>
                    <td>{e.event}</td>
                    <td>
                      <code>{e.detail}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </picto-styled>
      );

      if (this.component.props.length) {
        content.push(props);
      }
      if (this.component.events.length) {
        content.push(events);
      }
    }
    return content;
  }
}
