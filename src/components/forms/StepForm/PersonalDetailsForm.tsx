"use client";

import React from "react";

import { useSession } from "next-auth/react";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import TextInput from "@/components/inputs/TextInput";
import StepFormButton from "@/app/(other-pages)/checkout/_components/StepFormButton";

const PersonalDetailsForm = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const processData = (data: FieldValues) => {
    if (userId) {
      data.userId = userId;
      //Update the checkout Data
      dispatch(actions.updateCheckoutFormData(data));
      //Update the Current step
      dispatch(actions.setCurrentStep(currentStep + 1));
    }
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
          name="emailAddress"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.emailAddress}
        />

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.phone}
        />

        <StepFormButton />
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
