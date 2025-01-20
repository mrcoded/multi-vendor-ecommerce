import { createSlice } from "@reduxjs/toolkit";
import { checkoutInitialStateProps } from "../types";

const initialState: checkoutInitialStateProps = {
  currentStep: 1,
  checkoutFormData: {
    shippingCost: {},
    paymentMethod: {},
    personalDetails: {},
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
