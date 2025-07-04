export interface CategoryProps {
  id: string;
  title: string;
  link?: string;
  slug: string;
  imageUrl: string;
  products: {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    salePrice: number;
  }[];
}
