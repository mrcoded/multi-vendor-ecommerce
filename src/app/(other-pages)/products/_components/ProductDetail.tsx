"use client";

import React from "react";
import { Tag } from "lucide-react";

import { ProductFormData } from "@/types/products";

import { useCategoryById } from "@/hooks/useCategories";

import BreadCrumb from "@/components/BreadCrumb";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import ProductShareButton from "../_components/ProductShareButton";
import CategoryCarousel from "@/components/carousels/CategoryCarousel";
import ProductImageCarousel from "@/components/carousels/ProductImageCarousel";
import Loading from "@/app/loading";

const ProductDetail = ({
  product,
}: {
  product: ProductFormData | undefined | null;
}) => {
  if (!product) return <Loading />;

  const productId = product.id;
  const categoryId = product.categoryId;

  const { data: category } = useCategoryById(categoryId);

  const categoryProducts = category?.products ?? [];

  const products = categoryProducts.filter(
    (product: { id: string }) => product.id !== productId,
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/products/${productId}`;

  return (
    <div>
      <div className="hidden sm:flex">
        <BreadCrumb />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 px-1 sm:px-0">
        <ProductImageCarousel
          thumbnail={product.imageUrl}
          productImages={product.productImages}
        />

        <div className="col-span-full sm:col-span-8">
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <h2 className="text-xl lg:text-3xl font-semibold">
              {product.title}
            </h2>

            {/* Share Button */}
            <ProductShareButton urlToShare={urlToShare} />
          </div>
          <div className="border-b border-gray-500">
            <p className="py-2">{product?.description}</p>

            <div className="flex flex-col sm:flex-row items-center gap-5 lg:gap-8 mb-4">
              <p>SKU: {product.sku}</p>
              <p className="bg-lime-100 text-sm py-1.5 px-2.5 sm:px-4 rounded-full text-slate-900">
                <strong>Stock</strong>: {product.qty}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 border-b border-gray-500 pb-4">
            <div className="flex items-center gap-4">
              <h4 className="text-2xl">${product.salePrice}</h4>
              <del className="text-slate-400 text-sm">
                ${product?.productPrice}
              </del>
            </div>
            <p className="flex items-center">
              <Tag className="w-5 h-5 text-slate-400 me-2" />
              <span>Save 50% right now</span>
            </p>
          </div>

          <div className="flex justify-between items-center py-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-700 my-8 rounded-xl p-4">
        <h2 className="mb-4 text-xl font-semibold text-slate-200 ml-3">
          Similar Products
        </h2>
        <CategoryCarousel products={products} />
      </div>
    </div>
  );
};

export default ProductDetail;
