import React from "react";
import Link from "next/link";

import { CategoryProps } from "@/types/category";
import CategoryCarousel from "@/components/carousels/CategoryCarousel";

function CategoryList({
  storeId,
  category,
  isStorePage,
}: {
  storeId?: string;
  category?: CategoryProps;
  isStorePage?: boolean;
}) {
  const categoryProducts = isStorePage
    ? category?.products?.filter((product) => product.storeId === storeId)
    : category?.products;

  return (
    <div className="bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg text-slate-800 overflow-hidden">
      <div className="bg-slate-100 dark:bg-gray-800 py-2 sm:py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100 flex justify-between items-center">
        <h2 className="text-sm md:text-base">{category?.title}</h2>
        <Link
          href={`/categories/${category?.slug}`}
          className="px-2 lg:px-4 py-1 lg:py-2 text-sm md:text-base bg-lime-600 hover:bg-lime-800 duration-300 transition-all text-slate-50 rounded-md"
        >
          See All
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-700 py-2 sm:p-4">
        <CategoryCarousel
          isStorePage={isStorePage}
          products={categoryProducts}
        />
      </div>
    </div>
  );
}

export default CategoryList;
