"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { useIsMounted } from "@/hooks/useIsMounted";
import { cn } from "@/lib/utils";

function CartCounter({ className }: { className?: string }) {
  const cartItems = useSelector((store: RootState) => store.cart);
  const isMounted = useIsMounted();
  const count = isMounted ? cartItems.length : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} items`}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted hover:text-primary",
        className,
      )}
    >
      <ShoppingCart className="size-5 text-primary" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

export default CartCounter;
