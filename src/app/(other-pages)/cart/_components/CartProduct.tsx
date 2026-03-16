"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { actions } from "@/redux/slices/cartSlice";

interface ItemProps {
  id: string;
  title: string;
  imageUrl: string;
  qty: number;
  salePrice: number;
}

function CartProduct({ cartItem }: { cartItem: ItemProps }) {
  const dispatch = useDispatch();

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
    <div className="flex flex-col sm:flex-row items-start lg:items-center justify-between border-b border-gray-200  pb-4 mb-4 gap-4">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
          <Image
            src={cartItem.imageUrl}
            fill
            alt={cartItem.title}
            className="rounded-xl object-cover border border-gray-100"
          />
        </div>
        <div className="flex items-start flex-col gap-2 w-full sm:w-auto">
          <div className="flex flex-col flex-grow min-w-0">
            <Link
              href={`/products/${cartItem.id}`}
              className="font-bold text-gray-900 dark:text-muted-foreground text-sm sm:text-base line-clamp-2"
            >
              {cartItem.title}
            </Link>
            <p className="text-gray-500 text-xs">
              Unit Price: ${cartItem.salePrice}
            </p>
          </div>
          {/* Quantity Toggle */}
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
              <button
                onClick={() => handleQtyDecrement(cartItem.id)}
                className="p-2 hover:bg-gray-200 transition-colors border-r border-gray-300"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-4 py-1 text-sm font-bold text-gray-800 min-w-[40px] text-center">
                {cartItem.qty}
              </span>
              <button
                onClick={() => handleQtyIncrement(cartItem.id)}
                className="p-2 hover:bg-gray-200 transition-colors border-l border-gray-300"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            {/* Price & Delete */}
            <div className="sm:hidden flex items-center gap-1.5">
              <div className="text-right">
                <h4 className="font-bold text-gray-900 dark:text-muted-foreground text-sm sm:text-base">
                  ${(cartItem.salePrice * cartItem.qty).toFixed(2)}
                </h4>
              </div>
              <button
                onClick={() => handleRemoveFromCart(cartItem.id)}
                className="p-2 hover:bg-red-50 rounded-full transition-colors group"
              >
                <Trash2 className="text-gray-400 group-hover:text-red-600 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price & Delete */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="text-right">
          <h4 className="font-bold text-gray-900 dark:text-muted-foreground text-sm sm:text-base">
            ${(cartItem.salePrice * cartItem.qty).toFixed(2)}
          </h4>
        </div>
        <button
          onClick={() => handleRemoveFromCart(cartItem.id)}
          className="p-2 hover:bg-red-50 rounded-full transition-colors group"
        >
          <Trash2 className="text-gray-400 group-hover:text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
