import React, { Suspense } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import Loading from "@/app/loading";
import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewVendor = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <FormHeader title="New Vendor" />
      <Suspense fallback={<Loading />}>
        <VendorForm user={user} />
      </Suspense>
    </>
  );
};

export default NewVendor;
