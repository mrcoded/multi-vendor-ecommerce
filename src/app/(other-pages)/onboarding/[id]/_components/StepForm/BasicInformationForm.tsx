"use client";

import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import { VendorProps } from "@/types/vendors";
import StepFormButton from "../StepFormButton";
import TextInput from "@/components/inputs/TextInput";

const BasicInformationForm = ({
  vendor,
}: {
  vendor: VendorProps["vendorProfile"] | null;
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  const prefilled = useRef(false);

  const dispatch = useDispatch();

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
  } = useForm<VendorProps["vendorProfile"]>({
    defaultValues: {
      firstName: existingFormData.firstName || user?.name || "",
      lastName: existingFormData.lastName || "",
      email: existingFormData.email || user?.email || "",
      phone: existingFormData.phone || "",
      physicalAddress: existingFormData.physicalAddress || "",
      contactPerson: existingFormData.contactPerson || "",
      contactPersonPhone: existingFormData.contactPersonPhone || "",
    },
  });

  useEffect(() => {
    if (!vendor || prefilled.current) return;
    prefilled.current = true;

    reset({
      firstName:
        existingFormData.firstName || vendor.firstName || user?.name || "",
      lastName: existingFormData.lastName || vendor.lastName || "",
      email: existingFormData.email || vendor.email || user?.email || "",
      phone: existingFormData.phone || vendor.phone || "",
      physicalAddress:
        existingFormData.physicalAddress || vendor.physicalAddress || "",
      contactPerson:
        existingFormData.contactPerson || vendor.contactPerson || "",
      contactPersonPhone:
        existingFormData.contactPersonPhone || vendor.contactPersonPhone || "",
    });
  }, [vendor, reset, existingFormData, user?.name, user?.email]);

  const processData = (data: FieldValues) => {
    dispatch(actions.updateOnboardingFormData(data));
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Personal Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about yourself and your primary contact information.
        </p>
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="First Name"
            name="firstName"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Last Name"
            name="lastName"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
            disabled
          />

          <TextInput
            label="Phone Number"
            name="phone"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />

          <TextInput
            label="Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full sm:col-span-2"
          />

          <TextInput
            label="Contact Person"
            name="contactPerson"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Contact Person Phone"
            name="contactPersonPhone"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>

        <StepFormButton />
      </div>
    </form>
  );
};

export default BasicInformationForm;
