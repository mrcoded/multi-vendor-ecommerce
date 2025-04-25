"use client";

import React from "react";

import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

function Filters({ slug }: { slug: string }) {
  return (
    <div className="">
      <PriceFilter slug={slug} />
      <BrandFilter />
    </div>
  );
}

export default Filters;
