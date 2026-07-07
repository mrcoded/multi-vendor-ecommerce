"use client";

import React from "react";

import Link from "next/link";

import Image from "next/image";

import { CheckCircle2, FileText, ShoppingBag } from "lucide-react";

import formatDate from "@/lib/formatDate";

import { useOrder } from "@/hooks/useOrders";
import { OrderWithItems } from "@/types/order";

import AsyncContent from "@/components/feedback/AsyncContent";

import { Button } from "@/components/ui/button";

const OrderConfirmation = ({ id }: { id: string }) => {
  const {
    data: order,

    isLoading,

    isError,

    refetch,

    isFetched,
  } = useOrder(id);

  const orderLoadFailed = isFetched && (isError || !order);

  return (
    <AsyncContent
      isLoading={isLoading}
      isError={orderLoadFailed}
      onRetry={() => refetch()}
      variant="inline"
    >
      {order ? <OrderDetails order={order} id={id} /> : null}
    </AsyncContent>
  );
};

function OrderDetails({ order, id }: { order: OrderWithItems; id: string }) {
  const orderItems = order?.orderItems ?? [];

  const subTotal =
    orderItems?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) || 0;

  const shipping = order?.shippingCost || 0;

  const total = (subTotal + shipping).toFixed(2);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5 text-center sm:p-8">
        <div className="flex flex-col items-center">
          <CheckCircle2 className="mb-3 size-10 text-primary sm:size-12" />

          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            Order Received!
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for your purchase. Your order{" "}
            <span className="font-semibold text-foreground">
              #{order?.orderNumber}
            </span>{" "}
            is being processed.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/orders/${id}/invoice`}>
                <FileText className="size-4" />
                View Invoice
              </Link>
            </Button>

            <Button asChild variant="accent" size="sm">
              <Link href="/">
                <ShoppingBag className="size-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 border-b border-border pb-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Shipping Address
            </h2>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                {order.firstName} {order.lastName}
              </p>

              <p>{order.streetAddress}</p>

              <p>
                {order.city}, {order.country}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Payment Detail
            </h2>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.paymentMethod}
              </p>

              <p className="text-xs capitalize">
                Transaction date: {formatDate(order.createdAt.toString())}
              </p>

              <p className="text-xs uppercase">
                Transaction ID: {order.orderNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="py-5 sm:py-6">
          <h2 className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Your Items
          </h2>

          <ul className="divide-y divide-border">
            {orderItems.map((item) => (
              <li key={item.id} className="flex gap-3 py-3 sm:gap-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border sm:size-16">
                  <Image
                    src={item.imageUrl}
                    fill
                    alt={item.title}
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground sm:text-sm">
                    <span>Qty: {item.quantity}</span>

                    <span>
                      Cost:{" "}
                      <span className="font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>

              <span>${subTotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Shipping</span>

              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="text-sm font-semibold text-foreground">
                Total
              </span>

              <span className="text-lg font-bold text-primary">${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
