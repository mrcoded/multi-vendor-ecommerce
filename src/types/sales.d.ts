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
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    streetAddress: string;
    city: string;
    district: string;
    country: string;
  };
}
