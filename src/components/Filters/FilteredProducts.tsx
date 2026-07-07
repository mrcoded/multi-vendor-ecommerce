import React from "react";
import { PackageSearch } from "lucide-react";

import { CATALOG_PAGE_SIZE } from "@/constants/catalog";
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
  const pageSize = CATALOG_PAGE_SIZE;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <div className="flex-1">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <PackageSearch className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-base font-medium text-foreground">
            No products found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or browse other categories.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
            {products.map((product, index) => (
              <Product
                key={product.id}
                product={product}
                className="animate-fade-in"
                style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
              />
            ))}
          </div>
          <div className="mt-10 flex w-full items-center justify-center border-t border-border pt-8">
            <Paginate totalPages={totalPages} productCount={productCount} />
          </div>
        </>
      )}
    </div>
  );
}

export default FilteredProducts;
