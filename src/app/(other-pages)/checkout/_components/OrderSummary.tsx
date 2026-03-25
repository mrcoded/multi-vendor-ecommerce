"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useCreateOrder } from "@/hooks/useOrders";
import { RootState } from "@/types/redux";

import { useSelector, useDispatch } from "react-redux";
import { actions as cartActions } from "@/redux/slices/cartSlice";
import { actions as checkoutActions } from "@/redux/slices/checkoutSlice";

const OrderSummary = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  //create order mutation
  const { mutate: createOrder, isPending } = useCreateOrder();

  const { checkoutFormData, currentStep } = useSelector(
    (store: RootState) => store.checkout,
  );

  //Get cart items
  const cartItems = useSelector((store: RootState) => store.cart);
  const { reset } = useForm();

  //Sub total
  const subTotal =
    cartItems
      .reduce((total, item) => {
        return total + item.salePrice * item.qty;
      }, 0)
      .toFixed(2) ?? 0;

  //handleprevious function
  const handlePrevious = () => {
    dispatch(checkoutActions.setCurrentStep(currentStep - 1));
  };

  //on submit handler
  const onSubmit = () => {
    createOrder(
      {
        checkoutFormData: { ...checkoutFormData, userId },
        orderItems: cartItems,
      },
      {
        onSuccess: ({ data }) => {
          dispatch(cartActions.clearCart());
          toast.success("Order Successfully Placed!");
          router.push(`/order-confirmation/${data?.data?.id}`);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-lime-400">
        Order Summary
      </h2>

      {/* High-Density List */}
      <div className="divide-y divide-gray-100 dark:divide-zinc-800 border-y border-gray-100 dark:border-zinc-800">
        {cartItems.map((cartItem, i) => (
          <div
            key={cartItem.id || i}
            className="flex items-center justify-between py-3 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Compact Image with Badge */}
              <div className="relative size-12 flex-shrink-0">
                <Image
                  src={cartItem.imageUrl}
                  alt={cartItem.title}
                  fill
                  className="rounded-lg object-cover"
                />
                <div className="absolute -top-1.5 -right-1.5 size-5 bg-gray-900 dark:bg-lime-600 text-white text-[9px] font-black flex items-center justify-center rounded-full border border-white dark:border-zinc-950">
                  {cartItem.qty}
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold md:font-bold text-gray-900 dark:text-zinc-100 line-clamp-2 leading-tight">
                  {cartItem.title}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-zinc-500 mt-0.5">
                  ${cartItem.salePrice.toFixed(2)} / unit
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-[13px] font-black text-gray-900 dark:text-white">
                ${(cartItem.salePrice * cartItem.qty).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Minimalist Price Summary before Buttons */}
      <div className="mt-4 space-y-1.5 px-1">
        <div className="flex justify-between text-[11px] font-medium text-gray-500 uppercase tracking-wider">
          <span>Subtotal</span>
          <span className="text-gray-900 dark:text-white">${subTotal}</span>
        </div>
        <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white pt-2 border-t border-gray-50 dark:border-zinc-900">
          <span>Total</span>
          <span className="text-lime-600">${subTotal}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 mt-8">
        <button
          onClick={handlePrevious}
          type="button"
          className="w-full sm:w-auto flex items-center justify-center px-3.5 sm:px-6 py-2 sm:py-3 text-sm font-bold text-gray-500 dark:text-zinc-400 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="size-4 mr-1" />
          Back
        </button>

        {isPending ? (
          <button
            disabled
            className="w-full sm:w-auto flex items-center justify-center px-3 lg:px-8 py-2.5 text-sm font-black text-white bg-gray-900 dark:bg-lime-600 rounded-xl opacity-70"
          >
            Processing...
            <Loader2 className="size-4 ml-2 animate-spin" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto flex items-center justify-center px-3 lg:px-8 py-2.5 text-sm font-bold xl:font-black text-white bg-gray-900 dark:bg-lime-600 hover:bg-black dark:hover:bg-lime-700 rounded-xl transition-all active:scale-[0.98] shadow-md dark:shadow-none"
          >
            <span>Proceed to Checkout</span>
            <ChevronRight className="size-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
