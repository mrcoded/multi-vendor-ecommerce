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
  const hasItems = cartItems.length > 0;

  return (
    <div className="col-span-full md:col-span-8">
      {hasItems ? (
        <>
          <h2 className="py-2 mb-6 text-2xl font-bold text-gray-900 dark:text-foreground">
            Your Cart
          </h2>

          {/* Table Headers - Hidden on Mobile */}
          <div className="hidden sm:flex items-center justify-between border-b border-gray-200 text-gray-400 pb-3 font-semibold text-xs uppercase tracking-wider mb-4">
            <h2 className="w-1/2">Product</h2>
            <h2 className="w-1/5 text-center sm:text-start lg:text-center">
              Price
            </h2>
          </div>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <CartProduct cartItem={item} key={item.id} />
            ))}
          </div>

          {/* COUPON SECTION */}
          <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Have a promo code?
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                className="w-full sm:flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-lime-500 focus:border-lime-500 block p-2 sm:p-3 md:p-2 lg:p-3 outline-none transition-all"
                placeholder="Enter Coupon Code"
              />
              <button className="w-full sm:w-auto shrink-0  p-2 sm:py-4 sm:px-6 md:p-2.5 lg:py-4 lg:px-6 rounded-xl bg-lime-600 hover:bg-lime-700 text-white font-bold text-sm transition-colors">
                Apply
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default CartItems;
