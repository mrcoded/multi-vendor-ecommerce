"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";

function CartCounter() {
  const cartItems = useSelector((store: RootState) => store.cart);

  return (
    <Link
      href="/cart"
      type="button"
      className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
    >
      <ShoppingCart className="text-lime-700 dark:text-lime-500" />
      <span className="sr-only">Cart</span>
      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-6 dark:border-gray-900">
        {cartItems.length}
      </div>
    </Link>
  );
}

export default CartCounter;
