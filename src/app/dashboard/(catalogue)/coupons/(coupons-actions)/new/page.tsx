"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { makePostRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";

import TextInput from "@/components/inputs/TextInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import FormHeader from "../../../_components/FormHeader";

const NewCoupon = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const couponCode = generateCouponCode({
      title: data.title,
      expiryDate: data.expiryDate,
    });

    data.couponCode = couponCode;

    makePostRequest({
      setLoading,
      endpoint: "api/coupons",
      data,
      resourceName: "Coupon",
      reset,
    });
  };

  return (
    <div>
      <FormHeader title="New Coupon" />
      <form
        onClick={handleSubmit(onSubmit)}
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
