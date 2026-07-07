import React, { Suspense } from "react";
import { auth } from "@/auth";

import Loading from "@/app/loading";

import ProductForm from "@/components/forms/ProductForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

import { getAllStores } from "@/services/store-service";

const NewProduct = async () => {
  const session = await auth();
  const user = session?.user;

  const stores = await getAllStores();

  return (
    <>
      <FormHeader title="New Product" />
      <Suspense fallback={<Loading />}>
        <ProductForm user={user} stores={stores} />
      </Suspense>
    </>
  );
};

export default NewProduct;
