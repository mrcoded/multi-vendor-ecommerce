"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Button } from "@/components/ui/button";

const CartBanner = () => {
  const isMounted = useIsMounted();
  const cartItems = useSelector((store: RootState) => store.cart);

  if (!isMounted || cartItems.length === 0) {
    return null;
  }

  const subTotal = cartItems
    .reduce((total, item) => total + item.salePrice * item.qty, 0)
    .toFixed(2);

  return (
    <div className="border-b border-border bg-muted/40">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-1 items-center gap-3">
          <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <ShoppingBag className="size-4" aria-hidden />
          </div>
          <p className="text-sm text-foreground">
            <span className="font-semibold">{cartItems.length}</span>{" "}
            {cartItems.length === 1 ? "item" : "items"} in cart &middot; Subtotal{" "}
            <span className="font-semibold text-primary">${subTotal}</span>
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
          <Link href="/cart">Edit cart</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartBanner;
