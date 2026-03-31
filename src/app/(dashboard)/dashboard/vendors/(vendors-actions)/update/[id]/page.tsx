import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import Loading from "@/app/loading";
import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateVendor = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { id: vendorId } = await params;

  if (!vendorId) return notFound();

  return (
    <>
      <FormHeader title="Update Vendor" />
      <Suspense fallback={<Loading />}>
        <VendorForm vendorId={vendorId} user={user} />
      </Suspense>
    </>
  );
};

export default UpdateVendor;
