import React from "react";
import getData from "@/lib/getData";

import FilterComponent from "@/components/Filters/FilterComponent";

async function page({ searchParams }: { searchParams: string }) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const sort = searchParamsObject.get("sort");
  const min = searchParamsObject.get("min");
  const max = searchParamsObject.get("max");
  const search = searchParamsObject.get("search") || "";
  const page = searchParamsObject.get("page") || 1;

  const category = {
    title: search,
    slug: "",
    products: [],
    isSearch: true,
  };

  let products;

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
