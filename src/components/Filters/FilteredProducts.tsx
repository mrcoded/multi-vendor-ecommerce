import React from "react";

import Product from "../Product";
import Paginate from "./Paginate";

import { ProductsProp } from "@/types/Products";

async function FilteredProducts({
  products = [],
  productCount,
}: {
  products: ProductsProp["products"];
  productCount: number;
}) {
  //PAGINATION
  const pageSize = 3;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, i: React.Key) => {
        return <Product key={i} product={product} />;
      })}
      <div className="p-8 mx-auto flex items-center justify-center w-full">
        <Paginate totalPages={totalPages} />
      </div>
    </div>
  );
}

export default FilteredProducts;
