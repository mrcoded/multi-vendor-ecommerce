import React from "react";
import getData from "@/lib/getData";

import FilterComponent from "@/components/Filters/FilterComponent";

async function page({ searchParams }: { searchParams: string }) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const sort = searchParamsObject.get("sort") || "asc";
  const min = searchParamsObject.get("min") || 0;
  const max = searchParamsObject.get("max") || "";
  const search = searchParamsObject.get("search") || "";
  const page = searchParamsObject.get("page") || 1;

  const category = {
    title: search,
    slug: "",
    products: [],
    isSearch: true,
  };

  let products = await getData(
    `products?search=${search}&page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  if (search) {
    products = await getData(`products?search=${search}`);
  } else {
    products = await getData(`products?search=`);
  }

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}

export default page;
