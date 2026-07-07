"use client";

import React, { useEffect, useRef, useState } from "react";

import { RootState } from "@/types/redux";
import { VendorProps } from "@/types/vendors";

import { actions } from "@/redux/slices/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import ImageInput from "@/components/inputs/ImageInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "@/components/inputs/ArrayItemsInput";
import StepFormButton from "../StepFormButton";

const AdditionalInformationForm = ({
  vendor,
}: {
  vendor: VendorProps["vendorProfile"] | null;
}) => {
  const dispatch = useDispatch();
  const prefilled = useRef(false);

  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState<string[]>([]);

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  const existingFormData = useSelector(
    (store: RootState) => store.onboarding.onboardingFormData,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terms: existingFormData.terms || "",
      notes: existingFormData.notes || "",
      products: existingFormData.products || [],
      imageUrl: existingFormData.imageUrl || "",
    },
  });

  useEffect(() => {
    if (!vendor || prefilled.current) return;
    prefilled.current = true;

    const nextProducts = existingFormData.products?.length
      ? existingFormData.products
      : vendor.products || [];
    const nextImageUrl = existingFormData.imageUrl || vendor.imageUrl || "";

    setProducts(nextProducts);
    setImageUrl(nextImageUrl);

    reset({
      terms: existingFormData.terms || vendor.terms || "",
      notes: existingFormData.notes || vendor.notes || "",
      products: nextProducts,
      imageUrl: nextImageUrl,
    });
  }, [vendor, reset, existingFormData]);

  const processData = (data: FieldValues) => {
    data.products = products;
    data.imageUrl = imageUrl;

    dispatch(actions.updateOnboardingFormData(data));
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Business Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your store profile, product categories, and payment preferences.
        </p>
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <ArrayItemsInput
            setItems={setProducts}
            items={products}
            itemTitle="Product"
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="vendorProfileImageUploader"
            label="Store Profile Image"
          />

          <TextAreaInput
            label="Payment Terms"
            name="terms"
            register={register}
            errors={errors}
            isRequired={false}
          />

          <TextAreaInput
            label="Additional Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />
        </div>

        <StepFormButton />
      </div>
    </form>
  );
};

export default AdditionalInformationForm;
