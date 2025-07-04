import { store } from "../redux/store";

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

export type OnboardingInitialStateProps = {
  currentStep: number;
  onboardingFormData: {
    userId?: string;
    code?: string;
    // Personal Details
    firstName: string;
    lastName: string;
    email: string;
    contactPerson: string;
    contactPersonPhone: string;
    physicalAddress: string;
    phone: string;
    // Store Details
    products: string[];
    //Additional Information
    imageUrl: string;
    terms: string;
    notes: string;
  };
};
