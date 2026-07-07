"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { actions } from "@/redux/slices/cartSlice";
import { generateSlug } from "@/lib/generateSlug";
import { Button } from "@/components/ui/button";

interface ItemProps {
  id: string;
  title: string;
  imageUrl: string;
  qty: number;
  salePrice: number;
}

function CartProduct({ cartItem }: { cartItem: ItemProps }) {
  const dispatch = useDispatch();
  const lineTotal = cartItem.salePrice * cartItem.qty;

  function handleRemoveFromCart(cartId: string) {
    dispatch(actions.removeFromCart(cartId));
    toast.success(`${cartItem.title} removed`);
  }

  function handleQtyDecrement(cartId: string) {
    dispatch(actions.decrementQty(cartId));
  }

  function handleQtyIncrement(cartId: string) {
    dispatch(actions.incrementQty(cartId));
  }

  return (
    <article className="group px-4 py-4 transition-colors hover:bg-muted/30 sm:px-5">
      <div className="flex gap-3 sm:gap-4">
        <Link
          href={`/products/${generateSlug(cartItem.title)}`}
          className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/80 transition-shadow group-hover:ring-border sm:size-20"
        >
          <Image
            src={cartItem.imageUrl}
            fill
            alt={cartItem.title}
            unoptimized
            className="object-cover"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 space-y-1">
            <Link
              href={`/products/${generateSlug(cartItem.title)}`}
              className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors hover:text-primary"
            >
              {cartItem.title}
            </Link>
            <p className="text-xs text-muted-foreground">
              ${cartItem.salePrice.toFixed(2)} each
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
            <div className="inline-flex items-center overflow-hidden rounded-md border border-input bg-background shadow-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleQtyDecrement(cartItem.id)}
                className="size-7 rounded-none border-r border-input hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus className="size-3.5" />
              </Button>
              <span className="min-w-8 px-1 text-center text-xs font-semibold tabular-nums text-foreground">
                {cartItem.qty}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleQtyIncrement(cartItem.id)}
                className="size-7 rounded-none border-l border-input hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>

            <p className="min-w-[4.5rem] text-right text-sm font-semibold tabular-nums text-foreground sm:min-w-[5rem] sm:text-base">
              ${lineTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => handleRemoveFromCart(cartItem.id)}
          className="size-8 shrink-0 self-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remove ${cartItem.title} from cart`}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </article>
  );
}

export default CartProduct;
