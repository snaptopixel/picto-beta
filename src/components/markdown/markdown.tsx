import * as resource from '@/components/graph/resource';
import { Component, Element, Method, Prop } from '@stencil/core';
import { css } from 'emotion';
import Marked from 'marked';

Marked.setOptions({ breaks: true });

// In order to render previews we create a new "renderer" for Marked
const renderer = new Marked.Renderer();
// Use html code blocks ```html to hold preview markup
const code = renderer.code.bind(renderer);
// When parsing an html code block, create markup for the preview
renderer.code = (src: string, lang: string, isEscaped: boolean) => {
  switch (lang) {
    case 'html':
      const value = `<picto-preview source='${escape(src)}'></picto-preview>`;
      return value;
    default:
      return code(src, lang, isEscaped);
  }
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
  /** Component metadata, used to render props etc */
  @Prop() component: IComponentMeta;
  /** Url of a markdown file to load */
  @Prop() url: string;

  async componentWillLoad() {
    if (this.url) {
      return resource.open(this.url, src => (this.source = src));
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

  componentDidUnload() {
    if (this.url) {
      resource.close(this.url);
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
                      <td>
                        <b>{p.event}</b>
                        <p>{p.docs}</p>
                      </td>
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

      const methods = (
        <picto-styled style={{ display: 'block', marginTop: '30px' }}>
          <h3 class='title is-6'>
            <picto-icon name='bullhorn' class='has-text-link' />
            &nbsp;Methods
          </h3>
          <article class='message is-size-7'>
            <div class='message-body'>
              <table class={styles.propsTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Signature</th>
                  </tr>
                </thead>
                <tbody>
                  {this.component.methods.map(m => (
                    <tr>
                      <td>
                        <b>{m.name}</b>
                        <p>{m.docs}</p>
                      </td>
                      <td>
                        <picto-code
                          inline
                          source={m.signature.replace(m.name, '')}
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
      if (this.component.methods.length) {
        content.push(methods);
      }
    }
    return content;
  }
}
