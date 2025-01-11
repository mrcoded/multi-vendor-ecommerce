import React from "react";

import BannerForm from "@/components/forms/BannerForm";
import FormHeader from "@/app/dashboard/_components/FormHeader";

const NewBanner = () => {
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannerForm />
    </div>
  );
};

export default NewBanner;
