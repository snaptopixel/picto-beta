import classes from 'classnames';
import { css } from 'emotion';
function checkerboard(boxSize, boxColor) {
    return css `
    background-image: ${[
        `linear-gradient(45deg, ${boxColor} 25%, transparent 25%, transparent 75%, ${boxColor} 75%, ${boxColor})`,
        `linear-gradient(45deg, ${boxColor} 25%, transparent 25%, transparent 75%, ${boxColor} 75%, ${boxColor})`,
    ].join(', ')};
    background-size: ${boxSize}px ${boxSize}px;
    background-position: 0 0, ${boxSize / 2}px ${boxSize / 2}px;
  `;
}
var styles;
(function (styles) {
    styles.previewCard = classes('card-content', css `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background-color: white;
      ${checkerboard(20, 'rgba(0, 0, 0, .05)')};
    `);
    styles.sourceCard = classes('card-content', css `
      .hljs {
        margin: -1.5rem;
      }
    `);
    styles.eventsCard = classes('card-content', css `
      height: 200px;
      th {
        position: relative;
      }
      td {
        padding: '0';
        vertical-align: 'middle';
      }
      td:first-child {
        padding-left: 0.5rem;
        width: 25%;
      }
      .hljs {
        padding: 0.5rem !important;
      }
    `);
    styles.footerItem = classes('card-footer-item', 'is-size-7', css `
      font-weight: bold;
      padding: 0.3rem !important;
      &.is-selected {
        box-shadow: 0 1px inset;
      }
    `);
    styles.footerTag = classes('tag', 'is-link', 'is-rounded', 'is-outlined', css `
      margin-left: 0.5rem;
      font-size: 0.65rem;
      font-weight: bold;
      line-height: 1;
      &:empty {
        display: none !important;
      }
    `);
})(styles || (styles = {}));
export class Preview {
    constructor() {
        this.state = 'preview';
        this.events = [];
        this.viewedEventsCount = 0;
    }
    get eventCount() {
        return this.state === 'events' ||
            this.events.length <= this.viewedEventsCount
            ? null
            : this.events.length - this.viewedEventsCount;
    }
    setState(state, event) {
        event.preventDefault();
        if (state === 'events') {
            this.viewedEventsCount = this.events.length;
        }
        this.state = state;
    }
    handleEvent(event) {
        this.events = [...this.events, event];
    }
    componentWillLoad() {
        this.source = unescape(this.source);
    }
    render() {
        return [
            h("picto-styled", null,
                h("div", { class: 'card' },
                    h("div", { class: styles.previewCard, style: { display: this.state === 'preview' ? null : 'none' } },
                        h("div", { innerHTML: this.source, "no-style": true })),
                    h("div", { class: styles.sourceCard, style: { display: this.state === 'source' ? null : 'none' } },
                        h("picto-code", { source: this.source, lang: 'html' })),
                    h("picto-scrollarea", { class: styles.eventsCard, style: { display: this.state === 'events' ? 'block' : 'none' } },
                        h("picto-preview-events", { events: [
                                { name: 'foo', value: { foo: 'bar' } },
                                { name: 'bar', value: 1 },
                                { name: 'baz', value: true },
                                { name: 'foo', value: { foo: 'bar' } },
                                { name: 'bar', value: 1 },
                                { name: 'baz', value: true },
                                { name: 'foo', value: { foo: 'bar' } },
                                { name: 'bar', value: 1 },
                                { name: 'baz', value: true },
                            ] })),
                    h("footer", { class: 'card-footer' },
                        h("a", { class: {
                                [styles.footerItem]: true,
                                'is-selected': this.state === 'preview',
                            }, href: '', onClick: this.setState.bind(this, 'preview') },
                            h("span", null,
                                h("picto-icon", { name: 'paint-roller' }),
                                "Preview")),
                        h("a", { class: {
                                [styles.footerItem]: true,
                                'is-selected': this.state === 'source',
                            }, href: '', onClick: this.setState.bind(this, 'source') },
                            h("span", null,
                                h("picto-icon", { name: 'code' }),
                                "Source")),
                        h("a", { class: {
                                [styles.footerItem]: true,
                                'is-selected': this.state === 'events',
                            }, href: '', onClick: this.setState.bind(this, 'events') },
                            h("span", null,
                                h("picto-icon", { name: 'broadcast-tower' }),
                                "Events"),
                            h("span", { class: styles.footerTag }, this.eventCount))))),
        ];
    }
    static get is() { return "picto-preview"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "events": {
            "state": true
        },
        "source": {
            "type": String,
            "attr": "source",
            "mutable": true
        },
        "state": {
            "state": true
        }
    }; }
}
