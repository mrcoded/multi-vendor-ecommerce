"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, FileText } from "lucide-react";

import formatDate from "@/lib/formatDate";

import { useOrder } from "@/hooks/useOrders";
import Loading from "@/app/loading";

const OrderConfirmation = ({ id }: { id: string }) => {
  const orderData = useOrder(id);
  const order = orderData?.data ?? null;

  if (!order) return <Loading />;

  const orderItems = order?.orderItems ?? [];

  const subTotal =
    orderItems?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) || 0;

  const shipping = order?.shippingCost || 0;
  const total = (subTotal + shipping).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 text-center border-b border-gray-50 sm:p-10">
        <div className="flex flex-col items-center">
          <CheckCircle2 className="size-12 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Order Received!
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Thanks for your purchase. Your order{" "}
            <span className="font-semibold text-gray-900">
              #{order?.orderNumber}
            </span>{" "}
            is being processed.
          </p>

          <Link
            href={`/dashboard/orders/${id}/invoice`}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="size-4" />
            View Invoice
          </Link>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {/* Order Meta Grid */}
        <div className="grid grid-cols-1 gap-8 pb-8 border-b border-gray-100 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Shipping Address
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">
                {order.firstName} {order.lastName}
              </p>
              <p>{order.streetAddress}</p>
              <p>
                {order.city}, {order.country}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Payment Detail
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">{order.paymentMethod}</p>
              <p className="text-xs text-gray-600 capitalize">
                Transaction Date: {formatDate(order.createdAt.toString())}
              </p>
              <p className="text-xs text-gray-400 uppercase">
                Transaction ID: {order.orderNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="py-4 sm:py-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Your Items
          </h2>
          <ul className="divide-y divide-gray-100">
            {orderItems.map((item) => (
              <li key={item.id} className="flex py-2 sm:py-4 gap-4 sm:gap-6">
                <div className="relative size-16 sm:size-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100">
                  <Image
                    src={item.imageUrl}
                    fill
                    alt={item.title}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      {item.title}
                    </h3>
                    <span className="flex items-center space-x-3">
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="mt-1">
                        <span className="text-sm text-gray-500">Cost:</span>{" "}
                        <span className="text-sm font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="pt-6 mt-4 sm:mt-6 border-t border-gray-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-muted-foreground">
                ${total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
