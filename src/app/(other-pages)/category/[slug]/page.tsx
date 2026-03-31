import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import FilterComponent from "@/components/Filters/FilterComponent";

import { fetchCategoryBySlugAction } from "@/lib/actions/category-actions";
import { fetchFilteredProductsAction } from "@/lib/actions/product-actions";

// Define a type for your search parameters
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: category } = await fetchCategoryBySlugAction(slug);

  return {
    title: category?.title || "Category",
    description: category?.description || "",
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  if (!slug) return notFound();

  // Extract values directly from the object (safer than URLSearchParams here)
  const sort = (resolvedSearchParams.sort as "asc" | "desc") || "asc";
  const min = (resolvedSearchParams.min as string) || "0";
  const max = (resolvedSearchParams.max as string) || "";
  const page = (resolvedSearchParams.page as string) || "1";

  const { data: category } = await fetchCategoryBySlugAction(slug);

  //Fetch products using the resolved values
  const { data: products } = await fetchFilteredProductsAction({
    catId: category?.id,
    page,
    sort,
    min,
    max,
  });

  return (
    <Suspense fallback={<Loading />}>
      <FilterComponent category={category} products={products} />
    </Suspense>
  );
}

export default Page;
