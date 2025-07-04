"use client";

import React, { useState } from "react";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "@/components/inputs/ArrayItemsInput";
import StepFormButton from "@/app/(other-pages)/checkout/_components/StepFormButton";

const AdditionalInformationForm = () => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState<string[]>([]);

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.onboarding.onboardingFormData
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const processData = (data: FieldValues) => {
    //Update the onboarding Data
    data.products = products;
    data.imageUrl = imageUrl;

    dispatch(actions.updateOnboardingFormData(data));
    //Update the Current step
    dispatch(actions.setCurrentStep(currentStep + 1));
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Additional Information
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Product Tags */}
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="vendorProfileImageUploader"
          label="Vendor Profile Image"
        />

        <TextAreaInput
          label="Vendor's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
          defaultValue={existingFormData.terms}
        />

        <TextAreaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
          defaultValue={existingFormData.notes}
        />

        <ToggleInput
          label="Vendor Status"
          name="isActive"
          truthyValue="Active"
          falsyValue="Draft"
          register={register}
        />
      </div>
      <StepFormButton />
    </form>
  );
};

export default AdditionalInformationForm;
