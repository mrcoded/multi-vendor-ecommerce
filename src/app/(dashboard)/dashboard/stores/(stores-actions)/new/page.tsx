import React, { Suspense } from "react";
import { auth } from "@/auth";

import Loading from "@/app/loading";

import StoreForm from "@/components/forms/StoreForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewStore = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <FormHeader title="New Store" />
      <Suspense fallback={<Loading />}>
        <StoreForm user={user} />
      </Suspense>
    </>
  );
};

export default NewStore;
