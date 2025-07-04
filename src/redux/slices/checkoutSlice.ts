import { createSlice } from "@reduxjs/toolkit";
import { checkoutInitialStateProps } from "../../types/redux";

const initialState: checkoutInitialStateProps = {
  currentStep: 1,
  checkoutFormData: {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phone: "",
    // Shipping Details
    streetAddress: "",
    city: "",
    country: "",
    district: "",
    shippingCost: 0,
    //Payment Method
    paymentMethod: "",
    paymentToken: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    //Functions to manipulate the state
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    updateCheckoutFormData: (state, action) => {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});

//export the actions and reducers
export const { reducer, actions } = checkoutSlice;
