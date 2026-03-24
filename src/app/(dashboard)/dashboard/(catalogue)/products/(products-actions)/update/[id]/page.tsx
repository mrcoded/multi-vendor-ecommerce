import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import Loading from "@/app/loading";
import { authOptions } from "@/lib/authOptions";
import { fetchAllStoresAction } from "@/lib/actions/store-actions";

import ProductForm from "@/components/forms/ProductForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: productId } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!productId) return notFound();
  // const { data: stores } = useStores();

  const stores = fetchAllStoresAction();
  // const { data: userData } = useUsers();
  // const product = await getData(`products/${id}`);
  // const { data: categoriesData } = useCategories();

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
