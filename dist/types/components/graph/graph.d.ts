import '../../stencil.core';
import { VNode } from '../../stencil.core/dist/declarations';
import '@stencil/router';
export declare class Graph {
    el: HTMLElement;
    resourcesUrl: string;
    menuOptions: Array<IMenu | ILink>;
    pages: {
        [name: string]: {
            route?: string;
            source?: string;
            url?: string;
            vdom?: VNode | VNode[];
        };
    };
    indexSrc: string;
    parseLink(link: IMenu, route?: string): void;
    onNavLink({ detail: link }: CustomEvent<ILink>): void;
    componentWillLoad(): Promise<void>;
    render(): JSX.Element[];
}
