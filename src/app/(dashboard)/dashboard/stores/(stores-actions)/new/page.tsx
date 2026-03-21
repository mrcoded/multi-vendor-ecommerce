import React, { Suspense } from "react";
import { getServerSession } from "next-auth";

import Loading from "@/app/loading";
import { authOptions } from "@/lib/authOptions";

import StoreForm from "@/components/forms/StoreForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewStore = async () => {
  const session = await getServerSession(authOptions);
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
