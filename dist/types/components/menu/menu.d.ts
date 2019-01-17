import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Menu {
    el: HTMLElement;
    navLinkClicked: EventEmitter<ILink>;
    options: Array<IMenu | ILink>;
    selectedLink: ILink;
    renderLink(link: IMenu, showActive?: boolean): JSX.Element;
    render(): JSX.Element[];
}
