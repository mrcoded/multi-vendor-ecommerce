import React, { Suspense } from "react";

import Loading from "@/app/loading";
import CouponForm from "@/components/forms/CouponForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateCoupon = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: couponId } = await params;

  return (
    <div>
      <FormHeader title="Update Coupon" />
      <Suspense fallback={<Loading />}>
        <CouponForm couponId={couponId} />
      </Suspense>
    </div>
  );
};

export default UpdateCoupon;
