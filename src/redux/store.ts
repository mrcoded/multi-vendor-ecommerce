import { configureStore } from "@reduxjs/toolkit";
import { reducer as cartSlice } from "./slices/cartSlice";
import { reducer as checkoutSlice } from "./slices/checkoutSlice";
import { reducer as onboardingSlice } from "./slices/onboardingSlice";

//Create the Store
export const store = configureStore({
  reducer: {
    //Slices go here
    cart: cartSlice,
    checkout: checkoutSlice,
    onboarding: onboardingSlice,
  },
});
