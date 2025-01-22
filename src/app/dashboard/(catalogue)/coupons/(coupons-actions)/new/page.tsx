import React from "react";

import FormHeader from "@/app/dashboard/_components/shared/FormHeader";
import CouponForm from "@/components/forms/CouponForm";

const NewCoupon = () => {
  return (
    <>
      <FormHeader title="New Coupon" />
      <CouponForm />
    </>
  );
};

export default NewCoupon;
