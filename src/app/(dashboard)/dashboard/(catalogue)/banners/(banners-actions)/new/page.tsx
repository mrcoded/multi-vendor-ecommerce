import React, { Suspense } from "react";

import Loading from "@/app/loading";
import BannerForm from "@/components/forms/BannerForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewBanner = () => {
  return (
    <div>
      <FormHeader title="New Banner" />
      <Suspense fallback={<Loading />}>
        <BannerForm />
      </Suspense>
    </div>
  );
};

export default NewBanner;
