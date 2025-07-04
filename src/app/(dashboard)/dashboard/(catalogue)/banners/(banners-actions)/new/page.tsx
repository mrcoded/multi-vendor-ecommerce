import React from "react";

import BannerForm from "@/components/forms/BannerForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewBanner = () => {
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannerForm />
    </div>
  );
};

export default NewBanner;
