import { createSlice } from "@reduxjs/toolkit";
import { initialStateProps } from "../types";

const initialState: initialStateProps[] = [];

//Create a slice for the cart
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  //Create reducers for the cart
  reducers: {
    addToCart: (state, action) => {
      const { id, title, salePrice, imageUrl } = action.payload;
      //Check if item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        //If the item exists, increment the quantity
        existingItem.qty += 1;
      } else {
        //If the item does not exists, add it to the cart
        state.push({ id, title, salePrice, imageUrl, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      return state.filter((item) => item.id !== cartId);
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
      }
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
      }
    },
  },
});

//export the actions and reducers
export const { reducer, actions } = cartSlice;
