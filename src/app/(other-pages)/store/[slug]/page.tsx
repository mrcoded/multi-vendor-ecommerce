import React from "react";
import Image from "next/image";

import getData from "@/lib/getData";
import BreadCrumb from "@/components/BreadCrumb";

import { CategoryProps } from "@/types/category";
import CategoryList from "../../category/_components/CategoryList";

async function page({ params: { slug } }: { params: { slug: string } }) {
  const store = await getData(`stores/details/${slug}`);
  const storeCategoriyIds = store?.categoryIds;

  //Get Categories
  const categoriesData = await getData("categories");
  const categories = categoriesData?.filter((category: CategoryProps) => {
    return category.products.length > 1;
  });

  const storeCategories = categoriesData?.filter((category: CategoryProps) => {
    return storeCategoriyIds?.includes(category.id);
  });

  return (
    <>
      <BreadCrumb />
      <div className="bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 p-4 text-slate-800 dark:text-slate-200 overflow-hidden flex items-center gap-6">
        <div className="">
          <Image
            src={store?.imageUrl}
            width={50}
            height={50}
            alt={store?.title}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="">
          <h2 className="py-4 text-base lg:text-4xl">{store?.title}</h2>
          <p className="text-sm line-clamp-2 mb-4">{store?.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 py-8 w-full">
        <div className="col-span-full sm:col-span-12 rounded-md">
          {storeCategories?.map((category: CategoryProps) => {
            return (
              <div key={category.id} className="space-y-8">
                <CategoryList isStorePage={false} category={category} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
