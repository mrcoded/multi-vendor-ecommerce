"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";

import { RootState } from "@/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/redux/slices/checkoutSlice";

const OrderSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const checkoutFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData
  );

  const cartItems = useSelector((store: RootState) => store.cart);

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const handlePrevious = () => {
    dispatch(actions.setCurrentStep(currentStep - 1));
  };

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = (id: string) => {
    router.push(`/order-confirmation/${id}`);
  };

  const onSubmit = () => {
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    };

    makePostRequest({
      setLoading,
      endpoint: "api/orders",
      data,
      resourceName: "Order",
      reset,
      redirectUrl,
    });
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Order Summary
      </h2>

      {cartItems.map((cartItem, i) => {
        return (
          <div
            key={i}
            className="flex items-center justify-between border-b border-slate-400 pb-3 font-semibold text-sm mb-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={cartItem.imageUrl}
                alt={cartItem.title}
                width={249}
                height={249}
                className="rounded-xl w-14 h-14"
              />
              <div className="flex flex-col">
                <h2>{cartItem.title}</h2>
              </div>
            </div>
            <div className="rounded-xl border border-gray-400 flex gap-3 items-center">
              {/* <button
            className="border-r border-gray-400 py-2 px-4"
            onClick={() => {}}
          >
            <Minus />
          </button> */}

              <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
              {/* <button
            className="border-l border-gray-400 py-2 px-4"
            onClick={() => {}}
          >
            <Plus />
          </button> */}
            </div>
            <div className="flex items-center gap-2">
              <h4>${cartItem.salePrice}</h4>
              {/* <button
            className="border-l border-gray-400 py-2 px-4"
            onClick={() => {}}
          >
            <Trash2 className="text-red-600 size-5" />
          </button> */}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <span>Previous</span>
          <ChevronRight className="size-5 ml-2" />
        </button>
        {loading ? (
          <button
            disabled
            type="button"
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Processing Please wait...</span>
            <Loader2 className="inline size-5 ml-2 text-white animate-spin" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            type="submit"
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="size-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
