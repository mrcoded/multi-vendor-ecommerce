"use client";

import React from "react";
import { BaggageClaim } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { ProductProp } from "@/types/products";

import { actions } from "@/redux/slices/cartSlice";
import { Button } from "@/components/ui/button";

function AddToCartButton({
  product,
  compact = false,
  className,
  disabled,
}: {
  product: ProductProp;
  compact?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(actions.addToCart(product));
    toast.success(`${product.title} added to cart`);
  }

  return (
    <Button
      type="button"
      variant="accent"
      size={compact ? "icon-sm" : "sm"}
      onClick={handleAddToCart}
      disabled={disabled}
      className={cn(compact ? "shrink-0" : "gap-2", className)}
      aria-label={`Add ${product.title} to cart`}
    >
      <BaggageClaim className={compact ? "size-3.5" : "size-4"} />
      {!compact && <span>Add to Cart</span>}
    </Button>
  );
}

export default AddToCartButton;
