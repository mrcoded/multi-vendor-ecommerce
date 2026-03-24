import React, { Suspense } from "react";

import { getServerSession } from "next-auth";
import Loading from "@/app/loading";
import { authOptions } from "@/lib/authOptions";

import ProductForm from "@/components/forms/ProductForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";
import { fetchAllUsersAction } from "@/lib/actions/user-actions";
import { fetchAllStoresAction } from "@/lib/actions/store-actions";

const NewProduct = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const allUsers = fetchAllUsersAction();

  const stores = fetchAllStoresAction();

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
