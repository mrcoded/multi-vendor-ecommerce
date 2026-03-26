export interface CategoryProps {
  id: string;
  title: string;
  link?: string;
  slug: string;
  imageUrl: string | null;
  products: {
    id: string;
    title: string;
    storeId: string;
    slug: string;
    imageUrl: string | null;
    salePrice: number;
  }[];
}

export interface CategoryFormProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
}
