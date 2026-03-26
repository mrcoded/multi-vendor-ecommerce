import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewVendor = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div>
      <FormHeader title="New Vendor" />
      <VendorForm user={user} />
    </div>
  );
};

export default NewVendor;
