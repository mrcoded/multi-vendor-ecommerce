"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { makePostRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";

import TextInput from "@/components/inputs/TextInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

interface CouponFormProps {
  id: string;
  title: string;
  couponCode: string;
  expiryDate: string;
  isActive: boolean;
}

const CouponForm = ({ updateData }: { updateData?: CouponFormProps }) => {
  const router = useRouter();
  const id = updateData?.id ?? "";

  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const vendorId = session?.user?.id;

  //Convert updateData to required ISO date for display
  const isoDate = updateData?.expiryDate ?? "";
  const formattedDate = isoDate.split("T")[0];

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
    data.vendorId = vendorId;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/coupons/${id}`,
        data,
        resourceName: "Coupon",
        reset,
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/coupons",
        data,
        resourceName: "Coupon",
        reset,
        redirectUrl,
      });
    }
  };

  return (
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
          defaultValue={updateData?.title}
        />

        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={formattedDate}
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
        buttonTitle={id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Coupon please wait...`}
      />
    </form>
  );
};

export default CouponForm;
