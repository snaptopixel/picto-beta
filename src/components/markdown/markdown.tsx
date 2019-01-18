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

const styles = {
  main: css`
    display: block;
    font-size: 14px;
    line-height: 1.5;
  `,
  propsTable: css`
    width: 100%;
    color: inherit;
    margin-top: -10px;
    th {
      color: inherit !important;
      text-align: left;
      padding: 10px;
    }
    td {
      color: #363636;
      padding: 10px;
      vertical-align: middle !important;
      &:first-of-type {
        width: 40%;
        p {
          color: gray;
        }
      }
    }
    tbody tr:nth-of-type(odd) {
      background: rgba(255, 255, 255, 0.8);
    }
  `,
};

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
          <h3 class='title is-6'>
            <picto-icon name='cogs' class='has-text-link' />
            &nbsp;Props
          </h3>
          <article class='message is-size-7'>
            <div class='message-body'>
              <table class={styles.propsTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {this.component.props.map(p => (
                    <tr>
                      <td>
                        <b>{p.name}</b>
                        <p>{p.docs}</p>
                      </td>
                      <td>
                        <picto-code inline source={p.type} lang='ts' />
                      </td>
                      <td>
                        <picto-code inline source={p.default} lang='ts' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </picto-styled>
      );

      const events = (
        <picto-styled style={{ display: 'block', marginTop: '30px' }}>
          <h3 class='title is-6'>
            <picto-icon name='broadcast-tower has-text-link' />
            &nbsp;Events
          </h3>
          <article class='message is-size-7'>
            <div class='message-body'>
              <table class={styles.propsTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {this.component.events.map(p => (
                    <tr>
                      <td>{p.event}</td>
                      <td>
                        <picto-code
                          style={{ display: 'inline !important' }}
                          inline
                          source={p.detail}
                          lang='ts'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
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
