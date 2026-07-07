"use client";

import React from "react";
import Link from "next/link";
import { Lock, ShieldCheck, Truck } from "lucide-react";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CartSubTotalCard({
  subTotal,
  itemCount,
}: {
  subTotal: string;
  itemCount: number;
}) {
  const { data: session, status } = useSession();

  const subTotalNum = Number(subTotal) || 0;
  const shippingCost = 10;
  const tax = 0;
  const totalPrice = subTotalNum + shippingCost + tax;

  const checkoutPath = "/checkout";
  const loginPath = `/login?callbackUrl=${encodeURIComponent(checkoutPath)}`;
  const authTarget = session ? checkoutPath : loginPath;

  const summaryRows = [
    { label: "Subtotal", value: subTotalNum },
    { label: "Tax", value: tax },
    { label: "Shipping", value: shippingCost },
  ];

  return (
    <div className="lg:col-span-4">
      <Card className="border-border/80 shadow-sm md:sticky md:top-24">
        <CardHeader className="border-b border-border bg-muted/30 px-4 py-3 sm:px-5">
          <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
            Order summary
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in cart
          </p>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-5">
          <dl className="space-y-2.5">
            {summaryRows.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between text-sm"
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  ${value.toFixed(2)}
                </dd>
              </div>
            ))}
          </dl>

          <p className="rounded-md bg-secondary/60 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
            Shipping is calculated by weight. Free shipping on orders over 2kg.
          </p>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-3">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="text-lg font-bold tabular-nums text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <Button
            asChild
            variant="accent"
            className="w-full"
            disabled={status === "loading"}
          >
            <Link href={authTarget}>
              {status === "loading"
                ? "Loading..."
                : status === "unauthenticated"
                  ? "Login to checkout"
                  : "Continue to checkout"}
            </Link>
          </Button>

          <ul className="space-y-2 border-t border-border pt-3">
            <li className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Lock className="size-3 shrink-0 text-primary" />
              Secure encrypted checkout
            </li>
            <li className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3 shrink-0 text-primary" />
              Buyer protection on every order
            </li>
            <li className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Truck className="size-3 shrink-0 text-primary" />
              Fast delivery options at checkout
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default CartSubTotalCard;
