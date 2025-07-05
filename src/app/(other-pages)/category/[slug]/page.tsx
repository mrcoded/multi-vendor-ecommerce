import React from "react";
import getData from "@/lib/getData";

import FilterComponent from "@/components/Filters/FilterComponent";

async function page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: string;
}) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const sort = searchParamsObject.get("sort") || "asc";
  const min = searchParamsObject.get("min") || 0;
  const max = searchParamsObject.get("max") || "";
  const page = searchParamsObject.get("page") || 1;

  const category = await getData(`categories/filter/${slug}`);

  const products = await getData(
    `products?catId=${category.id}&page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}

export default page;
