export interface OrderCardProps {
  id: string;
  orderItems: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }>;
  orderNumber: string;
  createdAt: string;
  orderStatus: string;
}
