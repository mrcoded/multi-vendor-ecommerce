import React from "react";

import Product from "../Product";
import Paginate from "./Paginate";

import { ProductsProp } from "@/types/products";

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
    <>
      {products.length === 0 && (
        <p className="text-center text-base tracking-wider italic">
          Product Not Found!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 &&
          products.map((product, i: React.Key) => {
            return <Product key={i} product={product} />;
          })}
      </div>
      <div className="p-8 mx-auto flex items-center justify-center w-full">
        <Paginate totalPages={totalPages} />
      </div>
    </>
  );
}

export default FilteredProducts;
