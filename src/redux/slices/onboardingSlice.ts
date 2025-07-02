import { createSlice } from "@reduxjs/toolkit";
import { OnboardingInitialStateProps } from "../types";

const initialState: OnboardingInitialStateProps = {
  currentStep: 1,
  onboardingFormData: {
    firstName: "",
    lastName: "",
    email: "",
    contactPerson: "",
    contactPersonPhone: "",
    physicalAddress: "",
    phone: "",
    products: [],
    imageUrl: "",
    terms: "",
    notes: "",
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    //Functions to manipulate the state
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    updateOnboardingFormData: (state, action) => {
      state.onboardingFormData = {
        ...state.onboardingFormData,
        ...action.payload,
      };
    },
  },
});

//export the actions and reducers
export const { reducer, actions } = onboardingSlice;
