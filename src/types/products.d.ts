export interface ProductsProp {
  slug: string;
  id?: string;
  title: string;
  imageUrl?: string;
  isSearch?: boolean | undefined;
  products: {
    slug: string;
    id: string;
    title: string;
    imageUrl: string;
    salePrice: number;
  }[];
}

export interface ProductProp {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  salePrice: number;
}
