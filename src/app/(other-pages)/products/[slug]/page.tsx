import React, { Suspense } from "react";

import getData from "@/lib/getData";
import { Product } from "@prisma/client";

import Loading from "@/app/loading";
import ProductDetail from "../_components/ProductDetail";
import { notFound } from "next/navigation";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (!slug) return notFound();

  const product: Product = await getData(`products/${slug}`);
  const { id: productId } = product;
  console.log(product);
  const catId = product.categoryId;
  const category = await getData(`categories/${catId}`);

  const categoryProducts = category.products;
  const products = categoryProducts.filter(
    (product: { id: string }) => product.id !== productId,
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/products/${productId}`;

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail slug={slug} />
    </Suspense>
  );
};

export default ProductDetailPage;
