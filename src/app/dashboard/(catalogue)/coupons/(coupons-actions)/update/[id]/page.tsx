import React from "react";
import getData from "@/lib/getData";

import FormHeader from "@/app/dashboard/_components/FormHeader";
import CouponForm from "@/components/forms/CouponForm";

const UpdateCoupon = async ({ params: { id } }: { params: { id: string } }) => {
  const coupon = await getData(`coupons/${id}`);

  return (
    <div>
      <FormHeader title="Update Coupon" />
      <CouponForm updateData={coupon} />
    </div>
  );
};

export default UpdateCoupon;
