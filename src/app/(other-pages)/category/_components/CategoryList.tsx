import React from "react";
import Link from "next/link";

import { CategoryProps } from "@/types/category";
import CategoryCarousel from "@/components/carousels/CategoryCarousel";

function CategoryList({
  category,
  isStorePage,
}: {
  category: CategoryProps;
  isStorePage?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg text-slate-800 overflow-hidden">
      <div className="bg-slate-100 dark:bg-gray-800 py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100 flex justify-between items-center">
        <h2>{category.title}</h2>
        <Link
          href={`/categories/${category.slug}`}
          className="bg-lime-600 hover:bg-lime-800 duration-300 transition-all text-slate-50 rounded-md px-4 py-2"
        >
          See All
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-700 p-4">
        <CategoryCarousel
          isStorePage={isStorePage}
          products={category.products}
        />
      </div>
    </div>
  );
}

export default CategoryList;
