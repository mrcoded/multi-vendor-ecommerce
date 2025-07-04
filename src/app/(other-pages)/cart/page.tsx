"use client";

import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";

import BreadCrumb from "@/components/BreadCrumb";

import EmptyCart from "./_components/EmptyCart";
import CartItems from "./_components/CartItems";
import CartSubTotalCard from "./_components/CartSubTotalCard";

const page = () => {
  const cartItems = useSelector((store: RootState) => store.cart);

  const subTotal = cartItems
    .reduce((total, item) => {
      return total + item.salePrice * item.qty;
    }, 0)
    .toFixed(2);

  return (
    <div>
      <BreadCrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <CartItems cartItems={cartItems} />
          <CartSubTotalCard subTotal={subTotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default page;
