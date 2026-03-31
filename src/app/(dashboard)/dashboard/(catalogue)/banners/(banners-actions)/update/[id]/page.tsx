import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import BannerForm from "@/components/forms/BannerForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateBanner = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: bannerId } = await params;

  if (!bannerId) return notFound();

  return (
    <div>
      <FormHeader title="Update Banner" />
      <Suspense fallback={<Loading />}>
        <BannerForm bannerId={bannerId} />
      </Suspense>
    </div>
  );
};

export default UpdateBanner;
