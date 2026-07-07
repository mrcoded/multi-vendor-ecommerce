import React, { Suspense } from "react";
import { auth } from "@/auth";

import Loading from "@/app/loading";
import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewVendor = async () => {
  const session = await auth();
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
