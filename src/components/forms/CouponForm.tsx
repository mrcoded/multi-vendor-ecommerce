"use client";

import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";

import {
  useCouponById,
  useCreateCoupon,
  useUpdateCoupon,
} from "@/hooks/useCoupon";
import { useVendor } from "@/hooks/useVendor";
import { generateCouponCode } from "@/lib/generateCouponCode";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

import TextInput from "@/components/inputs/TextInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";

export interface CouponFormProps {
  id: string;
  title: string;
  couponCode: string;
  expiryDate: Date;
  vendorId: string | undefined;
  isActive: boolean;
}

const CouponForm = ({ couponId }: { couponId?: string }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const vendor = useVendor(userId);
  const { data: coupon } = useCouponById(couponId);

  //mutations
  const { mutate: createCoupon, isPending: isCreating } = useCreateCoupon();
  const { mutate: updateCoupon, isPending: isUpdating } = useUpdateCoupon();

  //Convert coupon to required ISO date for display
  const isoDate = coupon?.expiryDate
    ? new Date(coupon.expiryDate).toISOString()
    : "";
  const formattedDate = isoDate.split("T")[0];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: coupon?.title ?? "",
      expiryDate: formattedDate,
      isActive: coupon?.isActive ?? false,
    },
  });

  useEffect(() => {
    if (coupon) {
      reset({
        title: coupon.title,
        expiryDate: formattedDate,
        isActive: coupon.isActive,
      });
    }
  }, [coupon, reset]);

  const onSubmit = async (data: FieldValues) => {
    const formData = data as CouponFormProps;

    if (!data.title || !data.expiryDate) return;

    const formattedDate = generateISOFormatDate(new Date(formData.expiryDate));

    const couponCode = generateCouponCode({
      title: formData.title,
      expiryDate: formattedDate,
    });

    formData.couponCode = couponCode;
    formData.vendorId = vendor?.data?.id;
    formData.expiryDate = new Date(formData.expiryDate);

    if (couponId) {
      //PUT request (update)
      updateCoupon({ id: couponId, data: formData });
    } else {
      //POST request (create)
      createCoupon(formData);
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
          defaultCheck={coupon?.isActive}
        />
      </div>

      <SubmitButton
        isLoading={isCreating || isUpdating}
        buttonTitle={couponId ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={`${
          couponId ? "Updating" : "Creating"
        } Coupon please wait...`}
      />
    </form>
  );
};

export default CouponForm;
