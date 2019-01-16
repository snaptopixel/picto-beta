import '../../stencil.core';
export declare class Icon {
    name: string;
    styleType: 'solid' | 'regular' | 'brand';
    styleClasses: {
        solid: string;
        regular: string;
        brand: string;
    };
    render(): JSX.Element[];
}
