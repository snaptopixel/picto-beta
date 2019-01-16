import '../../stencil.core';
export declare class Preview {
    el: HTMLElement;
    source: string;
    state: 'preview' | 'source' | 'events';
    events: CustomEvent[];
    previewEl: HTMLElement;
    viewedEventsCount: number;
    readonly eventCount: number;
    setState(state: any, event: Event): void;
    handleEvent(event: CustomEvent): void;
    componentWillLoad(): void;
    render(): JSX.Element[];
}
