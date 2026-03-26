import { User } from "next-auth";
import { OrderCardProps } from "./order";
import { ProductFormData } from "./products";
import { StoreProps } from "./store";
import { VendorProps } from "./vendors";
import { SalesProps as SalesType } from "./sales";

export interface SalesProps {
  sales: Array<{
    period?: string;
    color?: string;
    createdAt: Date;
    productTitle: string;
    total: number;
  }>;
}

export interface OrderProps {
  orders: Array<{
    orderStatus: string;
  }>;
}

export interface DashboardProps {
  products: ProductFormData[];
  orders: OrderCardProps[];
  user: User | undefined;
  stores: StoreProps[];
  sales: SalesType[];
  vendors: VendorProps[];
  vendorId?: string;
}
