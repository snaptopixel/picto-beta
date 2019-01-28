import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';
import classes from 'classnames';
import { css } from 'emotion';
import Yaml from 'js-yaml';
import Popper from 'popper.js';

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
  previewCard: classes(
    'card-content',
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background-color: white;
      position: relative;
      ${checkerboard(20, 'rgba(0, 0, 0, .05)')};
      .tip {
        transition: all 0.5s;
        position: absolute;
        transform: translateX(10px);
        opacity: 0;
        top: -30px;
        right: 0;
        pointer-events: none;
      }
      &:hover .tip {
        transform: translateX(0);
        opacity: 1;
      }
      [menu-visible] &:hover .tip {
        opacity: 0;
      }
    `,
  ),
  sourceCard: classes(
    'card-content',
    css`
      .hljs {
        margin: -1.5rem;
      }
    `,
  ),
  eventsCard: classes(
    'card-content',
    css`
      height: 200px;
    `,
  ),
  footerItem: classes(
    'card-footer-item',
    'is-size-7',
    css`
      font-weight: bold;
      padding: 0.3rem !important;
      &.is-selected {
        box-shadow: 0 1px inset;
      }
    `,
  ),
  footerTag: classes(
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
  ),
};

@Component({
  tag: 'picto-preview',
})
export class Preview {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) source: string;
  @Prop({ mutable: true, reflectToAttr: true }) menuVisible = false;
  @Prop() component: IComponentMeta;

  @State() state: 'preview' | 'source' | 'events' = 'preview';
  @State() events: IComponentEvent[] = [];

  previewEl: HTMLElement;
  viewedEventsCount = 0;

  rightClick: MouseEvent;
  menuEl: HTMLElement;
  menuPopper: Popper;
  menuTarget: HTMLElement;
  previewProps: IPreviewProp[];
  execScript: string;

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
    this.events = [
      { event: event.type, detail: event.detail, when: new Date() },
      ...this.events,
    ];
  }

  showPropsMenu(e: MouseEvent) {
    const bounds = this.el.getBoundingClientRect();
    this.menuTarget.style.left = e.pageX - bounds.left + 'px';
    this.menuTarget.style.top = e.pageY - bounds.top + 'px';
    this.menuPopper.update();
    this.menuVisible = true;
    e.preventDefault();
    e.stopPropagation();
    this.setProps();
  }

  setProps() {
    const el: any = this.previewEl.querySelector(this.component.tag);
    this.previewProps = this.component.props.reduce(
      (props, prop) => {
        props.push({
          name: prop.name,
          type: prop.type,
          value: el[prop.name],
        });
        return props;
      },
      [] as IPreviewProp[],
    );
  }

  @Watch('component')
  addComponentListeners() {
    const el: any = this.previewEl.querySelector(this.component.tag);
    this.component.events.map(evt => {
      el.addEventListener(evt.event, this);
    });
  }

  @Listen('body:click')
  @Listen('body:contextmenu')
  onClick(event: MouseEvent) {
    const source = event.target as HTMLElement;
    const parent = source.closest('picto-props-menu');
    if (parent !== this.menuEl || source.hasAttribute('close-menu')) {
      this.menuVisible = false;
    }
  }

  @Listen('propChanged')
  onPropChanged(e: CustomEvent<{ name: string; value: any }>) {
    const el: any = this.previewEl.querySelector(this.component.tag);
    el[e.detail.name] = e.detail.value;
  }

  componentWillLoad() {
    this.source = unescape(this.source);
    const findScript = /<script>([^]+?)<\/script>/gm;
    const scriptResult = findScript.exec(this.source);
    if (scriptResult) {
      this.execScript = scriptResult[1];
    }
  }

  componentDidLoad() {
    this.menuPopper = new Popper(this.menuTarget, this.menuEl, {
      placement: 'bottom-start',
      modifiers: {
        flip: {
          behavior: ['right'],
        },
      },
    });
    if (this.execScript) {
      const elementsByRef: { [id: string]: HTMLElement } = {};
      Array.from(this.el.querySelectorAll('[ref]')).map(node => {
        const el = node as HTMLElement;
        elementsByRef[el.getAttribute('ref')] = el;
      });
      const fn = new Function(...Object.keys(elementsByRef), this.execScript);
      fn(...Object.values(elementsByRef));
    }
  }

  hostData() {
    return {
      class: css`
        position: relative;
        margin-top: 35px;
        display: block;
      `,
    };
  }

  render() {
    return [
      <picto-styled>
        <div
          ref={el => (this.menuTarget = el)}
          style={{ position: 'absolute' }}
        />
        <picto-props-menu
          style={{
            zIndex: '1',
            visibility: this.menuVisible ? 'visible' : 'hidden',
            boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          }}
          ref={(el: HTMLElement) => (this.menuEl = el)}
          props={this.previewProps}
          component={this.component}
        />
        <div class='card'>
          <div
            onContextMenu={e => this.showPropsMenu(e)}
            class={styles.previewCard}
            style={{ display: this.state === 'preview' ? null : 'none' }}
          >
            <picto-styled class='tip has-text-grey-light'>
              <picto-icon name='mouse-pointer' />
              Right-click to edit props
            </picto-styled>
            <div
              no-style
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div ref={el => (this.previewEl = el)} innerHTML={this.source} />
            </div>
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
            <picto-preview-events events={this.events} />
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
