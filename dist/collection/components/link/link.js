export class Link {
    constructor() {
        this.onClick = (e) => {
            e.preventDefault();
            this.linkClicked.emit(this.to);
        };
    }
    render() {
        return (h("a", { href: '', onClick: this.onClick },
            h("slot", null)));
    }
    static get is() { return "picto-link"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "to": {
            "type": String,
            "attr": "to"
        }
    }; }
    static get events() { return [{
            "name": "linkClicked",
            "method": "linkClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
