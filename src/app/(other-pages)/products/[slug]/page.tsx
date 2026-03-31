import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import ProductDetail from "../_components/ProductDetail";
import { getProductBySlugAction } from "@/lib/actions/product-actions";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (!slug) return notFound();

  const { data: product } = await getProductBySlugAction(slug);

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail product={product} />
    </Suspense>
  );
};

export default ProductDetailPage;
