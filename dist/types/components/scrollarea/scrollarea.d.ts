import '../../stencil.core';
export declare class ScrollArea {
    el: HTMLPictoScrollareaElement;
    scrollEl: HTMLDivElement;
    scrollListener: () => void;
    trackScrolling: () => void;
    setAttr(attr: string, value: boolean): void;
    componentDidLoad(): void;
    hostData(): {
        class: string;
    };
    render(): JSX.Element[];
}
