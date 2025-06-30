"use client";

import React from "react";

import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

function Filters({
  slug,
  isSearch,
}: {
  slug: string;
  isSearch: boolean | undefined;
}) {
  return (
    <div className="">
      <PriceFilter slug={slug} isSearch={isSearch} />
      <BrandFilter />
    </div>
  );
}

export default Filters;
