import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

import Loading from "@/app/loading";
import { getAllStores } from "@/services/store-service";

import ProductForm from "@/components/forms/ProductForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: productId } = await params;
  const session = await auth();
  const user = session?.user;

  if (!productId) return notFound();

  const stores = await getAllStores();

  return (
    <>
      <FormHeader title="Update Product" />
      <Suspense fallback={<Loading />}>
        <ProductForm user={user} productId={productId} stores={stores} />
      </Suspense>
    </>
  );
};

export default UpdateProduct;
