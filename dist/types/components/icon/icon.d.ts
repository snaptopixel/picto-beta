import '../../stencil.core';
export declare class Icon {
    name: string;
    styleType: 'solid' | 'regular';
    styleClasses: {
        solid: string;
        regular: string;
    };
    render(): JSX.Element[];
}
