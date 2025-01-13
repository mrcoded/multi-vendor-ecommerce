import React from "react";

import EmptyCart from "./EmptyCart";
import CartProduct from "./CartProduct";

interface ItemProps {
  cartItems: {
    id: string;
    title: string;
    imageUrl: string;
    qty: number;
    salePrice: number;
  }[];
}

function CartItems({ cartItems }: ItemProps) {
  return (
    <div className="md:col-span-8 col-span-full">
      {cartItems.length > 0 && (
        <>
          <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Product</h2>
          </div>
        </>
      )}
      <div>
        {/* CART PRODUCT */}
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item, i) => {
              return <CartProduct cartItem={item} key={i} />;
            })
          ) : (
            <EmptyCart />
          )}
        </div>

        {/* COUPON */}
        <div className="flex item-center gap-2 py-8">
          <input
            type="email"
            id="email"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2"
            placeholder="Enter Coupon"
          />
          <button className="shrink-0 py-2.5 px-4 rounded-lg bg-lime-600">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
