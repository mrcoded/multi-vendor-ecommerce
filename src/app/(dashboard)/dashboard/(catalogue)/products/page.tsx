import React, { Suspense } from "react";
import Loading from "@/app/loading";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { fetchAllProductsAction } from "@/lib/actions/product-actions";
import { fetchAllStoresAction } from "@/lib/actions/store-actions";

import ProductsTable from "./_components/ProductsTable";
import PageHeader from "../../_components/shared/PageHeader";

const Page = async () => {
  const session = await getServerSession(authOptions);
  //GET user data
  const user = session?.user;

  const { data: stores } = await fetchAllStoresAction();
  const { data: allProducts } = await fetchAllProductsAction();

  const allStoresData = stores ?? [];
  const allProductsData = allProducts ?? [];

  return (
    <>
      {/* Header */}
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkAction="Add Product"
      />

      <Suspense fallback={<Loading />}>
        {/* ProductsTable Component */}
        <ProductsTable
          products={allProductsData}
          stores={allStoresData}
          user={user}
        />
      </Suspense>
    </>
  );
};

export default Page;
