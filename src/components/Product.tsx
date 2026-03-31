"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { BaggageClaim } from "lucide-react";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { actions } from "../redux/slices/cartSlice";

import { ProductProp } from "@/types/products";

function Product({ product }: { product: ProductProp }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    //Dispatch the action to add the product to the cart
    dispatch(actions.addToCart(product));

    toast.success(`${product.title} added to cart`);
  }

  return (
    <div className="rounded-lg mr-0.5 lg:mr-3 bg-white dark:bg-slate-900 overflow-hidden shadow">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.imageUrl ?? ""}
          alt={product.title}
          width={556}
          height={556}
          priority
          unoptimized
          className="w-full h-28 sm:h-32 lg:h-48 object-cover"
        />
      </Link>

      <div className="w-full px-1.5 sm:px-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="mt-2 mb-1 text-xs sm:text-[10px] md:text-sm lg:text-base text-center dark:text-slate-200 text-slate-800 line-clamp-1 truncate font-semibold">
            {product.title}
          </h2>
        </Link>

        <div className="flex items-center justify-between gap-2 pb-2 sm:pb-3 dark:text-slate-200">
          <p className="text-nowrap sm:text-xs text-[10px] md:text-sm lg:text-base">
            USD {product.salePrice}
          </p>
          <button
            onClick={() => handleAddToCart()}
            className="flex items-center space-x-0.5 sm:space-x-2 bg-lime-600 px-1 sm:px-2 lg:px-4 py-1 lg:py-2 rounded-md text-white"
          >
            <BaggageClaim className="size-3 lg:size-6" />
            <span className="sm:text-xs text-[10px] md:text-sm lg:text-base">
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
