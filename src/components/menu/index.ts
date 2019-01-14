interface ILink {
  label?: string;
  href?: string;
  sref?: string;
  page?: string;
  icon?: string;
  preview?: {
    innerHTML?: string;
    props?: any;
  };
}

interface IMenu extends ILink {
  links?: Array<ILink | IMenu>;
  components?: IComponentMeta[];
}
