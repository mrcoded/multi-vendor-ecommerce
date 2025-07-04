import { createSlice } from "@reduxjs/toolkit";
import { cartInitialStateProps } from "../../types/redux";

//Get InitialState from locastorage if available
const initialState: cartInitialStateProps[] =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("cart") || "[]")) ||
  [];

//Create a slice for the cart
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  //Create reducers for the cart
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        title,
        salePrice,
        imageUrl,
        userId: vendorId,
      } = action.payload;
      //Check if item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        //If the item exists, increment the quantity
        existingItem.qty += 1;
      } else {
        //If the item does not exists, add it to the cart
        const newItem = { id, title, salePrice, imageUrl, qty: 1, vendorId };
        state.push(newItem);

        //Update Localstorage with the new state
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify([...state]));
        }
      }
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      //Update Localstorage with the new state
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }

      return newState;
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;

        //Update Localstorage with the new state
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify([...state]));
        }
      }
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;

        //Update Localstorage with the new state
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify([...state]));
        }
      }
    },
  },
});

//export the actions and reducers
export const { reducer, actions } = cartSlice;
