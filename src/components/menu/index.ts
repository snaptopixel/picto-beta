interface ILink {
  label?: string;
  href?: string;
  sref?: string;
  page?: string;
  icon?: string;
  iconStyle?: string;
  preview?: {
    innerHTML?: string;
    props?: any;
    style?: Partial<CSSStyleDeclaration>;
  };
}

interface IMenu extends ILink {
  links?: Array<ILink | IMenu>;
  components?: IComponentMeta[];
}
