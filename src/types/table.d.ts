// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RowDatas = {
  id: string;
  name?: string;
  isActive: boolean;
  role?: string;
  email?: string;
  title?: string;
  createdAt: string;
  imageUrl: string;
  expiryDate: string;
  couponCode: string;
};
