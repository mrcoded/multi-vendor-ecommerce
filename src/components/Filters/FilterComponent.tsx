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
  category: ProductsProp | undefined;
  products: ProductsProp["products"] | undefined;
}) => {
  const { title, slug } = category ?? {};
  const productCount = category?.products?.length ?? 0;

  return (
    <div className="flex-1 space-y-6 text-foreground">
      <BreadCrumb title={title} resultCount={productCount} />
      <SortingFilter isSearch={category?.isSearch} title={title} slug={slug} />

      <div className="grid grid-cols-12 gap-6 py-4 lg:py-8">
        <aside className="col-span-full lg:col-span-3">
          <Filters slug={slug} isSearch={category?.isSearch} />
        </aside>

        <div className="col-span-full lg:col-span-9">
          <FilteredProducts products={products} productCount={productCount} />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
