import React from "react";

import Filters from "./Filters";
import BreadCrumb from "./BreadCrumb";
import SortingFilter from "./SortingFilter";
import FilteredProducts from "./FilteredProducts";

interface ProductsProp {
  slug: string;
  id: string;
  title: string;
  imageUrl: string;
  products: {
    slug: string;
    id: string;
    title: string;
    imageUrl: string;
    salePrice: number;
  }[];
}

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
    <div>
      <div className="bg-white space-y-6 text-slate-900 py-8 px-4">
        <BreadCrumb title={title} resultCount={productCount} />
        <SortingFilter title={title} slug={slug} />

        <div className="grid grid-cols-12 py-8 gap-4">
          <div className="col-span-3">
            <Filters slug={slug} />
          </div>

          <div className="col-span-9">
            <FilteredProducts products={products} productCount={productCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
