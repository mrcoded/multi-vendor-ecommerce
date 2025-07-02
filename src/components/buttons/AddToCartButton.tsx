"use client";

import React from "react";
import { BaggageClaim } from "lucide-react";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { actions } from "@/redux/slices/cartSlice";

function AddToCartButton({ product }: any) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    //Dispatch the action to add the product to the cart
    dispatch(actions.addToCart(product));

    toast.success(`${product.title} added to cart`);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center space-x-2 bg-lime-600 hover:bg-lime-800 duration-300 transition-all text-white rounded-md px-4 py-2"
    >
      <BaggageClaim />
      <span>Add to Cart</span>
    </button>
  );
}

export default AddToCartButton;
