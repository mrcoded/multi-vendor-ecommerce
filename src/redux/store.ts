import { configureStore } from "@reduxjs/toolkit";
import { reducer as cartSlice } from "./slices/cartSlice";

//Create the Store
export const store = configureStore({
  reducer: {
    //Slices go here
    cart: cartSlice,
  },
});
