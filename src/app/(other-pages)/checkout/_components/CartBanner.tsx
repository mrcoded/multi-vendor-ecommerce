"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";

const CartBanner = () => {
  const cartItems = useSelector((store: RootState) => store.cart);

  const subTotal =
    cartItems
      .reduce((total, item) => {
        return total + item.salePrice * item.qty;
      }, 0)
      .toFixed(2) ?? 0;

  return (
    <div className="bg-gray-100 rounded-xl mb-6">
      <div className="p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center flex-1">
            <div className="inline-flex items-center justify-center flex-shrink-0 bg-gray-400 rounded-full w-9 h-9 text-gray-50">
              <ShoppingBag className="size-6" />
            </div>
            <p className="ml-3 text-base font-normal text-gray-900">
              You have {cartItems.length} items in cart. Sub total is{" "}
              <span className="font-bold">${subTotal}</span>
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              href="/cart"
              className="inline-flex items-center px-4 py-2 text-sm font-bold text-gray-600 transition-all duration-200 border border-gay-300 rounded-md bg-gray-50 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-offset-2 focus:ring-gray-500"
            >
              Edit cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBanner;
