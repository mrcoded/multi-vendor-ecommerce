import { OrderStatus } from "@prisma/client";

export interface OrderCardProps {
  id: string;
  orderItems: {
    id: string;
    title: string;
    quantity: number;
    price: number;
    imageUrl: string;
    vendorId: string;
  }[];
  orderNumber: string;
  createdAt: Date;
  orderStatus: string;
  userId: string;
}

export interface OrderStatusManagerProps {
  currentStatus: string;
  options: { id: string; title: string }[];
  onStatusChange: (data: OrderStatus) => void;
  isUpdating: boolean;
}

export interface CheckoutProps {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
  district: string;
  shippingCost: string;
  paymentMethod: string;
  paymentToken: string;
}

export interface OrderItemProps {
  id: string;
  imageUrl: string;
  qty: string;
  salePrice: string;
  storeId: string;
  title: string;
  vendorId: string;
}
