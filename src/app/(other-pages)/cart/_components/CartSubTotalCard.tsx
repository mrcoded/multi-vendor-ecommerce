"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

import { useSession } from "next-auth/react";

function CartSubTotalCard({ subTotal }: { subTotal: string }) {
  // Check if user is authenticated
  const { data: session, status } = useSession();

  // Logic Fix: Ensure subTotal is treated as a number for math
  const subTotalNum = Number(subTotal) || 0;
  const shippingCost = 10;
  const tax = 0;
  const totalPrice = subTotalNum + shippingCost + tax;

  // 1. Define the target and the return path
  const checkoutPath = "/checkout";
  const loginPath = `/login?callbackUrl=${encodeURIComponent(checkoutPath)}`;

  // If not authenticated, send to login with the callbackUrl param.
  const authTarget = session ? checkoutPath : loginPath;

  {
    status === "loading" && <>Loading</>;
  }
  return (
    <div className="lg:col-span-4 md:col-span-4 col-span-full">
      <div className="md:sticky md:top-24 bg-white border border-gray-200 rounded-2xl p-6 md:p-3.5 lg:p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Order Summary
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${subTotalNum.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Tax</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${tax.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pb-4">
            <span>Shipping</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${shippingCost.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-xs text-gray-400 font-normal leading-relaxed mb-4">
              * Shipping is calculated based on weight. Free shipping applies to
              orders over 2kg.
            </p>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-2xl font-black text-lime-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={authTarget}
            className="flex items-center justify-center w-auto sm:w-full bg-gray-900 md:text-base text-white rounded-xl p-2 sm:py-4 sm:px-6 md:p-2 lg:py-4 lg:px-6 font-bold md:font-semibold hover:bg-gray-800 transition-all dark:bg-lime-600 dark:hover:bg-lime-700 shadow-lg shadow-gray-200 dark:shadow-none"
          >
            {status === "unauthenticated"
              ? "Login to Checkout"
              : "Continue to Checkout"}
          </Link>

          <p className="flex gap-2 items-center justify-center text-xs text-gray-400 mt-4 uppercase tracking-widest">
            <Lock className="size-3 " /> Secure Checkout
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartSubTotalCard;
