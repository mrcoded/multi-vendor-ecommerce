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

  let products = await getData(
    `products?catId=${category.id}&page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  // if (page) {
  //   products = await getData(`products?catId=${category.id}&page=${page}`);
  // } else if (max && min) {
  //   products = await getData(
  //     `products?catId=${category.id}&sort=asc&min=${min}&max=${max}`
  //   );
  // } else if (min) {
  //   products = await getData(
  //     `products?catId=${category.id}&sort=${sort}&min=${min}`
  //   );
  // } else if (max) {
  //   products = await getData(
  //     `products?catId=${category.id}&sort=${sort}&max=${max}`
  //   );
  // } else {
  //   products = await getData(`products?catId=${category.id}`);
  // }

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}

export default page;
