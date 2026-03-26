export interface SalesInvoiceProps {
  order: {
    id: string;
    orderItems: Array<{
      id: string;
      title: string;
      quantity: number;
      price: number;
    }>;
    orderNumber: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    emailAddress: string;
    streetAddress: string;
    city: string;
    district: string;
    country: string;
  };
}

export interface SalesProps {
  id: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
  productPrice: number;
  storeId: string;
  orderId: string;
  productId: string;
  productImageUrl: string;
  productTitle: string;
  productQty: number;
  total: number;
}
