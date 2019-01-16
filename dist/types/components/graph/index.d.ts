interface IComponentMeta {
    docs: string;
    events: Array<{
        bubbles: boolean;
        cancelable: boolean;
        composed: boolean;
        detail: string;
        docs: string;
        event: string;
    }>;
    methods: [];
    props: Array<{
        attr: string;
        default: string;
        docs: string;
        mutable: boolean;
        name: string;
        optional: boolean;
        reflectToAttr: boolean;
        required: boolean;
        type: string;
    }>;
    readme: string;
    styles: [];
    tag: string;
    usage: {};
}
interface IComponentManifest {
    compiler: {
        name: string;
        typescriptVersion: string;
        version: string;
    };
    components: IComponentMeta[];
}
