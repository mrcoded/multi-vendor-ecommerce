import React from "react";
import getData from "@/lib/getData";

import BannerForm from "@/components/forms/BannerForm";
import FormHeader from "@/app/dashboard/_components/shared/FormHeader";

const UpdateBanner = async ({ params: { id } }: { params: { id: string } }) => {
  const banner = await getData(`banners/${id}`);

  return (
    <div>
      <FormHeader title="Update Banner" />
      <BannerForm updateData={banner} />
    </div>
  );
};

export default UpdateBanner;
