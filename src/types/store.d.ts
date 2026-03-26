export interface StoreProps {
  id: string;
  title: string;
  categoryIds: string[];
  imageUrl: string | null;
  description: string | null;
  isActive: boolean;
  streetAddress: string;
  vendorId: string;
  city: string;
  slug: string;
  storeEmail: string;
  storePhone: string;
  country: string;
  createdAt?: Date | string;
}

interface StoreFormProps {
  storeId?: string;
  currentVendorId?: string;
}

// export interface Store {
//   id: string;
//   title: string;
// }

export interface StoreFilterProps {
  stores: Store[] | undefined;
  onStoreChange: (storeId: string) => void;
}
