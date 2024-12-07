"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";

import { makePostRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";

import TextInput from "@/components/inputs/TextInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import FormHeader from "@/app/dashboard/_components/FormHeader";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

const NewCoupon = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/coupons");
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.title || !data.expiryDate) return;

    const couponCode = generateCouponCode({
      title: data.title,
      expiryDate: data.expiryDate,
    });

    const formattedDate = generateISOFormatDate(data.expiryDate);
    data.expiryDate = formattedDate;

    data.couponCode = couponCode;

    makePostRequest({
      setLoading,
      endpoint: "api/coupons",
      data,
      resourceName: "Coupon",
      reset,
      redirectUrl,
    });
  };

  return (
    <div>
      <FormHeader title="New Coupon" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Coupon Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Coupon Expiry Date"
            name="expiryDate"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
          />

          <ToggleInput
            label="Publish your Coupon"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Coupon"
          loadingButtonTitle="Creating Coupon please wait..."
        />
      </form>
    </div>
  );
};

export default NewCoupon;
