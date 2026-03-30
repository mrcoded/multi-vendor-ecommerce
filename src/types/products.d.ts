import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CategoryProps } from "./category";
import { UserProps } from "./user";
import { StoreProps } from "./store";

export interface ProductsProp {
  slug: string;
  id?: string;
  title: string;
  imageUrl?: string | null;
  isSearch?: boolean | undefined;
  products: {
    slug: string;
    id: string;
    title: string;
    imageUrl: string | null;
    salePrice: number;
  }[];
}

export interface ProductProp {
  id: string;
  slug: string;
  title: string;
  imageUrl: string | null;
  salePrice: number;
}

export interface ProductFormProps {
  currentVendorId?: string;
  stores:
    | Array<{
        id: string;
        title: string;
      }>
    | undefined;
  updateData?: ProductFormData;
  categories: { id: string; title: string }[];
  vendors: { id: string; name: string }[];
}

export interface ProductServicesProps {
  id: string;
  title: string;
  slug: string;
  productImages: Array<string>;
  isActive: boolean;
  categoryId: string;
  storeIds: string[];
  storeId: string;
  imageUrl: string;
  description: string | null;
  isWholesale: boolean;
  sku: string | null;
  barcode: string | null;
  productPrice: number;
  productCode: string | null;
  salePrice: number;
  qty: number;
  tags: string[];
  wholesaleQuantity: number | null;
  wholesalePrice: number | null;
  userId: string;
  store?: { id: string; title: string } | null;
  createdAt: Date | string;
}

export interface ProductFormData {
  id: string;
  title: string;
  slug: string;
  productImages: Array<string>;
  isActive: boolean;
  categoryId: string;
  storeId: string;
  imageUrl: string;
  description: string | null;
  isWholesale: boolean;
  sku: string | null;
  barcode: string | null;
  productPrice: number;
  productCode: string | null;
  salePrice: number;
  qty: number;
  tags: string[];
  wholesaleQuantity: number | null;
  wholesalePrice: number | null;
  userId: string;
  store?: { id: string; title: string } | null;
  createdAt: Date | string;
}

export interface ProductInputFormProps {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  reset: <T extends object>(values?: T | undefined) => void;
  watch: any;
  categoriesData: CategoryProps[];
  vendorId: string | undefined;
  role: string | undefined;
  isWholeSale: boolean;
  isWholesaleCheck: boolean;
  setIsWholesaleCheck: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: string;
  productImages: string[];
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  product?: ProductFormData | null;
  users: UserProps[] | undefined;
  allStores: StoreProps[] | undefined;
}
