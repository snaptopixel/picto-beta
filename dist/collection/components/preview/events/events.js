import classes from 'classnames';
import { css } from 'emotion';
var styles;
(function (styles) {
    styles.table = classes('table', css `
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
    styles.tip = classes('has-text-info', 'has-text-grey-light', css `
      position: absolute;
      margin-top: -0.5em;
    `);
})(styles || (styles = {}));
export class Events {
    render() {
        return [
            h("picto-styled", null,
                h("table", { class: styles.table },
                    h("tr", null,
                        h("th", null, "Event"),
                        h("th", null,
                            "Detail",
                            ' ',
                            h("a", { title: 'Check dev console for more info' },
                                h("picto-icon", { class: styles.tip, name: 'info-circle' })))),
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
