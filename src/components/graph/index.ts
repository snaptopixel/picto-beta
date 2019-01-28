interface IComponentEvent {
  event: string;
  detail: any;
  when: Date;
}

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
  methods: Array<{
    name: string;
    returns: {
      type: string;
      docs: string;
    };
    signature: string;
    parameters: Array<{
      name: string;
      type: string;
      docs: string;
    }>;
    docs: string;
    docsTags: [];
  }>;
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
