import React from "react";
import getData from "@/lib/getData";

import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateVendor = async ({ params: { id } }: { params: { id: string } }) => {
  const vendor = await getData(`vendors/${id}`);

  return (
    <div>
      <FormHeader title="Update Vendor" />
      <VendorForm updateData={vendor} />
    </div>
  );
};

export default UpdateVendor;
