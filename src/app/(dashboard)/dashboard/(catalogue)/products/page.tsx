import React, { Suspense } from "react";

import Loading from "@/app/loading";

import { auth } from "@/auth";
import { getAllStores } from "@/services/store-service";
import { getAllProducts } from "@/services/product-service";

import { safeServerRead } from "@/lib/api/resilient-read";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";

import ProductsTable from "./_components/ProductsTable";
import PageHeader from "../../_components/shared/PageHeader";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";

const Page = async () => {
  const session = await auth();

  const user = session?.user;

  const [stores, products] = await Promise.all([
    safeServerRead(() => getAllStores(), {
      source: "products:stores",
      fallback: null,
    }),
    safeServerRead(() => getAllProducts(), {
      source: "products:list",
      fallback: null,
    }),
  ]);

  if (!stores || !products) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage("Failed to fetch products data")}
        reloadOnRetry
        variant="inline"
        showHomeLink={false}
        className="min-h-[40vh]"
      />
    );
  }

  return (
    <>
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkAction="Add Product"
      />

      <Suspense fallback={<Loading />}>
        <ProductsTable products={products} stores={stores} user={user} />
      </Suspense>
    </>
  );
};

export default Page;
