import { css } from 'emotion';
const icons = css `
  @import url('https://use.fontawesome.com/releases/v5.6.1/css/all.css');
`;
export class Icon {
    constructor() {
        this.styleType = 'solid';
        this.styleClasses = {
            solid: 'fas',
            regular: 'far',
        };
    }
    render() {
        return [
            h("span", { class: 'icon' },
                h("i", { class: `${this.styleClasses[this.styleType]} fa-${this.name}` })),
        ];
    }
    static get is() { return "picto-icon"; }
    static get properties() { return {
        "name": {
            "type": String,
            "attr": "name"
        },
        "styleType": {
            "type": String,
            "attr": "style-type"
        }
    }; }
}
