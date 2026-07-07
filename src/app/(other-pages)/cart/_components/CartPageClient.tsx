"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";

import BreadCrumb from "@/components/BreadCrumb";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import CartSubTotalCard from "./CartSubTotalCard";

export default function CartPageClient() {
  const cartItems = useSelector((store: RootState) => store.cart);

  const itemCount = cartItems.reduce((count, item) => count + item.qty, 0);
  const subTotal = cartItems
    .reduce((total, item) => total + item.salePrice * item.qty, 0)
    .toFixed(2);

  return (
    <div className="mx-auto max-w-6xl px-3 pb-10 pt-2 sm:px-4 sm:pt-4">
      <BreadCrumb />

      {cartItems.length > 0 ? (
        <>
          <header className="mb-6 border-b border-border pb-5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Shopping Cart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} · ${subTotal}{" "}
              subtotal
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <CartItems cartItems={cartItems} itemCount={itemCount} />
            <CartSubTotalCard subTotal={subTotal} itemCount={itemCount} />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
