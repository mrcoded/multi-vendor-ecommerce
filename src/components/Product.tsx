import React from "react";

import Link from "next/link";
import Image from "next/image";
import { BaggageClaim } from "lucide-react";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { actions } from "../redux/slices/cartSlice";

interface ProductsProp {
  slug: string;
  id: string;
  title: string;
  imageUrl: string;
  salePrice: number;
}

function Product({ product }: { product: ProductsProp }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    //Dispatch the action to add the product to the cart
    dispatch(actions.addToCart(product));

    toast.success(`${product.title} added to cart`);
  }

  return (
    <div className="rounded-lg mr-3 bg-white dark:bg-slate-900 overflow-hidden border shadow">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={556}
          height={556}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="px-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-center dark:text-slate-200 text-slate-800 my-2 font-semibold">
            {product.title}
          </h2>
        </Link>

        <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200">
          <p>USD {product.salePrice}</p>
          <button
            onClick={() => handleAddToCart()}
            className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md text-white"
          >
            <BaggageClaim />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
