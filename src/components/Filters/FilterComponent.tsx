import React from "react";

import Filters from "./Filters";
import BreadCrumb from "./BreadCrumb";
import SortingFilter from "./SortingFilter";
import FilteredProducts from "./FilteredProducts";

import { ProductsProp } from "@/types/products";

const FilterComponent = ({
  category,
  products,
}: {
  category: ProductsProp;
  products: ProductsProp["products"];
}) => {
  const { title, slug } = category;
  const productCount = category.products.length;

  return (
    <div className="bg-white space-y-6 text-slate-900 py-8 px-4">
      <BreadCrumb title={title} resultCount={productCount} />
      <SortingFilter isSearch={category?.isSearch} title={title} slug={slug} />

      <div className="grid grid-cols-12 py-8 gap-4">
        <div className="col-span-3">
          <Filters slug={slug} isSearch={category?.isSearch} />
        </div>

        <div className="col-span-9">
          <FilteredProducts products={products} productCount={productCount} />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
