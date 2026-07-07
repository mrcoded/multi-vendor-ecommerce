import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import FilterComponent from "@/components/Filters/FilterComponent";
import { getCategoryBySlug } from "@/services/category-service";
import { getFilteredProducts } from "@/services/product-service";
import {
  buildPageMetadata,
  hasListingQueryParams,
  noIndexMetadata,
} from "@/lib/seo";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const category = await getCategoryBySlug(slug);
  const cleanPath = `/category/${slug}`;

  if (hasListingQueryParams(resolvedSearchParams)) {
    return noIndexMetadata(
      category?.title || "Category",
      category?.description ?? undefined,
      cleanPath,
    );
  }

  return buildPageMetadata({
    title: category?.title || "Category",
    description: category?.description,
    path: cleanPath,
    image: category?.imageUrl,
  });
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

  const sort = (resolvedSearchParams.sort as "asc" | "desc") || "asc";
  const min = (resolvedSearchParams.min as string) || "0";
  const max = (resolvedSearchParams.max as string) || "";
  const page = (resolvedSearchParams.page as string) || "1";

  const category = await getCategoryBySlug(slug);

  const products = await getFilteredProducts({
    catId: category?.id,
    page,
    sort,
    min,
    max,
  });

  return (
    <Suspense fallback={<Loading />}>
      <FilterComponent category={category ?? undefined} products={products} />
    </Suspense>
  );
}

export default Page;
