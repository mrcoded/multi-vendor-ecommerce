import React from "react";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

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
    <div>
      <FormHeader title="Update Vendor" />
      <VendorForm vendorId={vendorId} user={user} />
    </div>
  );
};

export default UpdateVendor;
