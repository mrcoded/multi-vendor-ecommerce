import React from "react";

import Product from "../Product";
import Paginate from "./Paginate";

import { ProductsProp } from "@/types/products";

async function FilteredProducts({
  products = [],
  productCount,
}: {
  products: ProductsProp["products"] | undefined;
  productCount: number;
}) {
  //PAGINATION
  const pageSize = 9;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <div className="flex-1">
      {products.length === 0 ? (
        <p className="dark:text-gray-400 text-center text-base tracking-wider">
          Product Not Found!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 lg:gap-2 xl:gap-4">
            {products.length > 0 &&
              products.map((product, i: React.Key) => {
                return <Product key={i} product={product} />;
              })}
          </div>
          <div className="p-8 mx-auto flex items-center justify-center w-full dark:text-gray-400">
            <Paginate totalPages={totalPages} productCount={productCount} />
          </div>
        </>
      )}
    </div>
  );
}

export default FilteredProducts;
