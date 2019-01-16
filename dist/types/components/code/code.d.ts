import '../../stencil.core';
export declare class Code {
    /** Source code as a string */
    source: string;
    /** Language for highlighting */
    lang: string;
    srcEl: HTMLPreElement;
    componentDidLoad(): void;
    render(): JSX.Element;
}
