import React from "react";
import FilterComponent from "@/components/Filters/FilterComponent";
import { fetchFilteredProductsAction } from "@/lib/actions/product-actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  //Extract values with fallbacks
  const sort = (params.sort as "asc" | "desc") || "asc";
  const min = (params.min as string) || "0";
  const max = (params.max as string) || "";
  const page = (params.page as string) || "1";
  const search = (params.search as string) || "";

  // We pass all filters. If 'search' is empty, the action should handle it.
  const { data: productsData } = await fetchFilteredProductsAction({
    search,
    page,
    sort,
    min,
    max,
  });

  // Handle the nested structure of your action response
  const products = productsData ?? [];

  const category = {
    title: search,
    slug: "",
    products: [],
    isSearch: true,
  };

  return (
    <div className="container mx-auto py-8">
      <FilterComponent category={category} products={products} />
    </div>
  );
}

export default Page;
