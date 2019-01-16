import '../../stencil.core';
export declare class Markdown {
    el: HTMLElement;
    resourcesUrl: string;
    /** The markdown to be rendered */
    source: string;
    url: string;
    componentWillLoad(): Promise<void>;
    render(): JSX.Element;
}
