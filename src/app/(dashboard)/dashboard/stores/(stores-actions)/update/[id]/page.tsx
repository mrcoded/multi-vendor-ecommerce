import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import Loading from "@/app/loading";
import { authOptions } from "@/lib/authOptions";

import StoreForm from "@/components/forms/StoreForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateStore = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: storeId } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!storeId) return notFound();

  return (
    <>
      <FormHeader title="Update Store" />
      <Suspense fallback={<Loading />}>
        <StoreForm user={user} storeId={storeId} />
      </Suspense>
    </>
  );
};

export default UpdateStore;
