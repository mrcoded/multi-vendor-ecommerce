"use client";

import React from "react";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import StepFormButton from "../StepFormButton";
import TextInput from "@/components/inputs/TextInput";

const BasicInformationForm = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.onboarding.onboardingFormData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const processData = (data: FieldValues) => {
    //Update the onboarding Data
    dispatch(actions.updateOnboardingFormData(data));
    //Update the Current step
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Personal Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.firstName}
        />

        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.lastName}
        />

        <TextInput
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.email}
        />

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.phone}
        />

        <TextInput
          label="Vendor's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.physicalAddress}
        />

        <TextInput
          label="Vendor's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.contactPerson}
        />

        <TextInput
          label="Vendor's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.contactPersonPhone}
        />
      </div>
      <StepFormButton />
    </form>
  );
};

export default BasicInformationForm;
