import { store } from "./store";

// Infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

export type cartInitialStateProps = {
  id: string;
  title: string;
  salePrice: number;
  imageUrl: string;
  qty: number;
};

export type checkoutInitialStateProps = {
  currentStep: number;
  checkoutFormData: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phone: string;
    // Shipping Details
    streetAddress: string;
    city: string;
    country: string;
    district: string;
    shippingCost: number;
    //Payment Method
    paymentMethod: string;
    paymentToken: string;
  };
};
