import React from "react";
import getData from "@/lib/getData";

import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/dashboard/_components/FormHeader";

const UpdateVendor = async ({ params: { id } }: { params: { id: string } }) => {
  const vendor = await getData(`vendors/${id}`);

  return (
    <div>
      <FormHeader title="Update Community Post" />
      <VendorForm updateData={vendor} />
    </div>
  );
};

export default UpdateVendor;
