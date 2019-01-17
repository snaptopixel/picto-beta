import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Link {
    el: HTMLElement;
    linkClicked: EventEmitter<string>;
    to: string;
    onClick: (e: UIEvent) => void;
    render(): JSX.Element;
}
