import React, { Suspense } from "react";

import Loading from "@/app/loading";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";
import CouponForm from "@/components/forms/CouponForm";

const NewCoupon = () => {
  return (
    <>
      <FormHeader title="New Coupon" />
      <Suspense fallback={<Loading />}>
        <CouponForm />
      </Suspense>
    </>
  );
};

export default NewCoupon;
