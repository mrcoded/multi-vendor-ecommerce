"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useCreateOrder } from "@/hooks/useOrders";
import { RootState } from "@/types/redux";
import { OrderItemProps } from "@/types/order";

import { useSelector, useDispatch } from "react-redux";
import { actions as cartActions } from "@/redux/slices/cartSlice";
import { actions as checkoutActions } from "@/redux/slices/checkoutSlice";
import { Button } from "@/components/ui/button";

const OrderSummary = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const { checkoutFormData, currentStep } = useSelector(
    (store: RootState) => store.checkout,
  );

  const cartItems = useSelector((store: RootState) => store.cart);
  const { reset } = useForm();

  const subTotal = cartItems
    .reduce((total, item) => total + item.salePrice * item.qty, 0)
    .toFixed(2);

  const total = (
    parseFloat(subTotal) + parseFloat(checkoutFormData.shippingCost || "0")
  ).toFixed(2);

  const handlePrevious = () => {
    dispatch(checkoutActions.setCurrentStep(currentStep - 1));
  };

  const toOrderItems = (): OrderItemProps[] =>
    cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      qty: String(item.qty),
      salePrice: String(item.salePrice),
      vendorId: item.vendorId ?? "",
      storeId: item.storeId ?? "",
    }));

  const onSubmit = () => {
    createOrder(
      {
        checkoutFormData: { ...checkoutFormData, userId },
        orderItems: toOrderItems(),
      },
      {
        onSuccess: ({ data }) => {
          dispatch(cartActions.clearCart());
          reset();
          toast.success("Order Successfully Placed!");
          router.push(`/order-confirmation/${data?.id}`);
        },
      },
    );
  };

  return (
    <div>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Review Your Order
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm your items and totals before placing your order.
        </p>
      </div>

      <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
        <div className="divide-y divide-border rounded-xl border border-border">
          {cartItems.map((cartItem, i) => (
            <div
              key={cartItem.id || i}
              className="flex items-center justify-between p-3.5 transition-colors hover:bg-muted/40 sm:p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border">
                  <Image
                    src={cartItem.imageUrl}
                    alt={cartItem.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-background bg-primary text-[9px] font-bold text-primary-foreground">
                    {cartItem.qty}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
                    {cartItem.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    ${cartItem.salePrice.toFixed(2)} / unit
                  </p>
                </div>
              </div>

              <p className="ml-2 shrink-0 text-sm font-semibold text-foreground">
                ${(cartItem.salePrice * cartItem.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>Subtotal</span>
            <span className="text-foreground">${subTotal}</span>
          </div>
          <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>Shipping</span>
            <span className="text-foreground">
              ${checkoutFormData.shippingCost || "0.00"}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-sm font-semibold text-foreground">
            <span>Total</span>
            <span className="text-primary">${total}</span>
          </div>
        </div>

        <div className="flex flex-col-reverse items-stretch gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            onClick={handlePrevious}
            type="button"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="size-4" />
            Edit Details
          </Button>

          {isPending ? (
            <Button disabled size="sm" className="w-full sm:w-auto">
              Processing
              <Loader2 className="size-4 animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              variant="accent"
              size="sm"
              className="w-full sm:w-auto"
            >
              Place Order
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
