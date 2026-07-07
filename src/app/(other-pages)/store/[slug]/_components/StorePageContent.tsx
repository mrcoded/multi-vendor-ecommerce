import React from "react";
import { Package } from "lucide-react";

import { StoreProps } from "@/types/store";
import { CategoryProps } from "@/types/category";

import StoreDetails from "./StoreDetails";
import StoreEmptyState from "./StoreEmptyState";
import BreadCrumb from "@/components/BreadCrumb";
import CategoryList from "@/app/(other-pages)/category/_components/CategoryList";

function StorePageContent({
  store,
  storeCategories,
  productCount,
}: {
  store: StoreProps;
  storeCategories: CategoryProps[];
  productCount: number;
}) {
  return (
    <>
      <BreadCrumb
        labels={{ [store.slug]: store.title }}
        hiddenSegments={["store"]}
      />

      <StoreDetails
        store={store}
        productCount={productCount}
        categoryCount={storeCategories.length}
      />

      {storeCategories.length > 0 ? (
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-2.5 sm:pb-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Package className="size-4 text-primary" />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground sm:text-base">
                  Products from {store.title}
                </h2>
                <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                  {productCount} {productCount === 1 ? "item" : "items"} across{" "}
                  {storeCategories.length}{" "}
                  {storeCategories.length === 1 ? "category" : "categories"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {storeCategories.map((category) => (
              <CategoryList
                key={category.id}
                storeId={store.id}
                isStorePage
                category={category}
              />
            ))}
          </div>
        </section>
      ) : (
        <StoreEmptyState storeTitle={store.title} />
      )}
    </>
  );
}

export default StorePageContent;
