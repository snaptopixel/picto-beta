import { h } from '../picto.core.js';

import { a as commonjsGlobal, b as commonjsRequire, c as createCommonjsModule, d as css } from './chunk-a05410b6.js';

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

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
    styles.previewCard = classnames('card-content', css `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background-color: white;
      ${checkerboard(20, 'rgba(0, 0, 0, .05)')};
    `);
    styles.sourceCard = classnames('card-content', css `
      .hljs {
        margin: -1.5rem;
      }
    `);
    styles.eventsCard = classnames('card-content', css `
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
    styles.footerItem = classnames('card-footer-item', 'is-size-7', css `
      font-weight: bold;
      padding: 0.3rem !important;
      &.is-selected {
        box-shadow: 0 1px inset;
      }
    `);
    styles.footerTag = classnames('tag', 'is-link', 'is-rounded', 'is-outlined', css `
      margin-left: 0.5rem;
      font-size: 0.65rem;
      font-weight: bold;
      line-height: 1;
      &:empty {
        display: none !important;
      }
    `);
})(styles || (styles = {}));
class Preview {
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

var styles$1;
(function (styles) {
    styles.table = classnames('table', css `
      width: 100%;
      td {
        padding: 0;
        vertical-align: middle;
      }
      td:first-child {
        padding-left: 0.5rem;
        width: 25%;
      }
      .hljs {
        margin: -0.5rem;
      }
    `);
    styles.tip = classnames('has-text-info', 'has-text-grey-light', css `
      position: absolute;
      margin-top: -0.5em;
    `);
})(styles$1 || (styles$1 = {}));
class Events {
    render() {
        return [
            h("picto-styled", null,
                h("table", { class: styles$1.table },
                    h("tr", null,
                        h("th", null, "Event"),
                        h("th", null,
                            "Detail",
                            ' ',
                            h("a", { title: 'Check dev console for more info' },
                                h("picto-icon", { class: styles$1.tip, name: 'info-circle' })))),
                    this.events.map(e => (h("tr", null,
                        h("td", null, e.name),
                        h("td", null,
                            h("picto-code", { source: JSON.stringify(e.value), lang: 'js' }))))))),
        ];
    }
    static get is() { return "picto-preview-events"; }
    static get properties() { return {
        "events": {
            "type": "Any",
            "attr": "events"
        }
    }; }
}

var styles$2;
(function (styles) {
    const fullSize = css `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `;
    const shadow = (position) => css `
    content: '';
    opacity: 0;
    transition: opacity linear 100ms;
    position: absolute;
    width: 100%;
    height: 10px;
    ${position}: 0;
    background: linear-gradient(
      to ${position},
      transparent,
      rgba(0, 0, 0, 0.1)
    );
    [scroll-${position}] & {
      opacity: 1;
    }
  `;
    styles.component = css `
    display: block;
    position: relative;
  `;
    styles.content = css `
    ${fullSize};
    overflow: auto;
  `;
    styles.overlay = css `
    pointer-events: none;
    ${fullSize};
    &:before {
      ${shadow('top')};
    }
    &:after {
      ${shadow('bottom')};
    }
  `;
})(styles$2 || (styles$2 = {}));
class ScrollArea {
    constructor() {
        this.scrollListener = () => {
            requestAnimationFrame(this.trackScrolling);
        };
        this.trackScrolling = () => {
            const st = this.scrollEl.scrollTop;
            const ch = this.scrollEl.clientHeight;
            const sh = this.scrollEl.scrollHeight;
            this.setAttr('scroll-top', st > 0);
            this.setAttr('scroll-bottom', sh - st !== ch);
        };
    }
    setAttr(attr, value) {
        if (value) {
            this.el.setAttribute(attr, '');
        }
        else {
            this.el.removeAttribute(attr);
        }
    }
    componentDidLoad() {
        this.trackScrolling();
    }
    hostData() {
        return {
            class: styles$2.component,
        };
    }
    render() {
        return [
            h("div", { ref: e => (this.scrollEl = e), onScroll: this.scrollListener, class: styles$2.content },
                h("slot", null)),
            h("div", { class: styles$2.overlay }),
        ];
    }
    static get is() { return "picto-scrollarea"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
}

export { Preview as PictoPreview, Events as PictoPreviewEvents, ScrollArea as PictoScrollarea };
