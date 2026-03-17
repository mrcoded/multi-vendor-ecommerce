import React from "react";

import getData from "@/lib/getData";
import BreadCrumb from "@/components/BreadCrumb";

import { StoreProps } from "../types";
import { CategoryProps } from "@/types/category";

import CategoryList from "../../category/_components/CategoryList";
import StoreDetails from "./_components/StoreDetails";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const store: StoreProps = await getData(`stores/details/${slug}`);
  const storeCategoriyIds = store?.categoryIds;

  //Get Categories
  const categoriesData = await getData("categories");
  //get store categories
  const storeCategories = categoriesData?.filter((category: CategoryProps) => {
    return storeCategoriyIds?.includes(category.id);
  });

  return (
    <>
      <BreadCrumb />
      <StoreDetails store={store} />
      <div className="grid grid-cols-12 gap-6 py-8 w-full">
        <div className="space-y-5 md:space-y-8 col-span-full sm:col-span-12 rounded-md">
          {storeCategories?.map((category: CategoryProps) => {
            return (
              <div key={category.id}>
                <CategoryList
                  storeId={store.id}
                  isStorePage={true}
                  category={category}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
