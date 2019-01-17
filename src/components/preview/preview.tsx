import { Component, Element, Prop, State } from '@stencil/core';
import classes from 'classnames';
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

namespace styles {
  export const previewCard = classes(
    'card-content',
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background-color: white;
      ${checkerboard(20, 'rgba(0, 0, 0, .05)')};
    `,
  );
  export const sourceCard = classes(
    'card-content',
    css`
      .hljs {
        margin: -1.5rem;
      }
    `,
  );
  export const eventsCard = classes(
    'card-content',
    css`
      height: 200px;
      th {
        position: relative;
      }
      td {
        padding: '0';
        vertical-align: 'middle';
      }
      td:first-of-type {
        padding-left: 0.5rem;
        width: 25%;
      }
      .hljs {
        padding: 0.5rem !important;
      }
    `,
  );
  export const footerItem = classes(
    'card-footer-item',
    'is-size-7',
    css`
      font-weight: bold;
      padding: 0.3rem !important;
      &.is-selected {
        box-shadow: 0 1px inset;
      }
    `,
  );
  export const footerTag = classes(
    'tag',
    'is-link',
    'is-rounded',
    'is-outlined',
    css`
      margin-left: 0.5rem;
      font-size: 0.65rem;
      font-weight: bold;
      line-height: 1;
      &:empty {
        display: none !important;
      }
    `,
  );
}

@Component({
  tag: 'picto-preview',
})
export class Preview {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) source: string;

  @State() state: 'preview' | 'source' | 'events' = 'preview';
  @State() events: CustomEvent[] = [];

  previewEl: HTMLElement;
  viewedEventsCount = 0;

  get eventCount() {
    return this.state === 'events' ||
      this.events.length <= this.viewedEventsCount
      ? null
      : this.events.length - this.viewedEventsCount;
  }

  setState(state: any, event: Event) {
    event.preventDefault();
    if (state === 'events') {
      this.viewedEventsCount = this.events.length;
    }
    this.state = state;
  }

  handleEvent(event: CustomEvent) {
    this.events = [...this.events, event];
  }

  componentWillLoad() {
    this.source = unescape(this.source);
  }

  render() {
    return [
      <picto-styled>
        <div class='card'>
          <div
            class={styles.previewCard}
            style={{ display: this.state === 'preview' ? null : 'none' }}
          >
            <div innerHTML={this.source} no-style />
          </div>
          <div
            class={styles.sourceCard}
            style={{ display: this.state === 'source' ? null : 'none' }}
          >
            <picto-code source={this.source} lang='html' />
          </div>
          <picto-scrollarea
            class={styles.eventsCard}
            style={{ display: this.state === 'events' ? 'block' : 'none' }}
          >
            <picto-preview-events
              events={[
                { name: 'foo', value: { foo: 'bar' } },
                { name: 'bar', value: 1 },
                { name: 'baz', value: true },
                { name: 'foo', value: { foo: 'bar' } },
                { name: 'bar', value: 1 },
                { name: 'baz', value: true },
                { name: 'foo', value: { foo: 'bar' } },
                { name: 'bar', value: 1 },
                { name: 'baz', value: true },
              ]}
            />
          </picto-scrollarea>
          <footer class='card-footer'>
            <a
              class={{
                [styles.footerItem]: true,
                'is-selected': this.state === 'preview',
              }}
              href=''
              onClick={this.setState.bind(this, 'preview')}
            >
              <span>
                <picto-icon name='paint-roller' />
                Preview
              </span>
            </a>
            <a
              class={{
                [styles.footerItem]: true,
                'is-selected': this.state === 'source',
              }}
              href=''
              onClick={this.setState.bind(this, 'source')}
            >
              <span>
                <picto-icon name='code' />
                Source
              </span>
            </a>
            <a
              class={{
                [styles.footerItem]: true,
                'is-selected': this.state === 'events',
              }}
              href=''
              onClick={this.setState.bind(this, 'events')}
            >
              <span>
                <picto-icon name='broadcast-tower' />
                Events
              </span>
              <span class={styles.footerTag}>{this.eventCount}</span>
            </a>
          </footer>
        </div>
      </picto-styled>,
    ];
  }
}
