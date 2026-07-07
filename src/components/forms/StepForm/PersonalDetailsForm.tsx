"use client";

import React, { useEffect, useRef } from "react";

import { User } from "next-auth";
import { CheckoutProps } from "@/types/order";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import TextInput from "@/components/inputs/TextInput";
import StepFormButton from "@/app/(other-pages)/checkout/_components/StepFormButton";

const PersonalDetailsForm = ({
  user,
  order,
}: {
  user: User | undefined;
  order: CheckoutProps | null;
}) => {
  const userId = user?.id;
  const dispatch = useDispatch();
  const prefilled = useRef(false);

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: existingFormData.firstName || user?.name || "",
      lastName: existingFormData.lastName || "",
      emailAddress: existingFormData.emailAddress || user?.email || "",
      phone: existingFormData.phone || "",
    },
  });

  useEffect(() => {
    if (!order || prefilled.current) return;
    prefilled.current = true;

    reset({
      firstName:
        existingFormData.firstName || order.firstName || user?.name || "",
      lastName: existingFormData.lastName || order.lastName || "",
      emailAddress:
        existingFormData.emailAddress ||
        order.emailAddress ||
        user?.email ||
        "",
      phone: existingFormData.phone || order.phone || "",
    });
  }, [order, reset, existingFormData, user?.name, user?.email]);

  const processData = (data: FieldValues) => {
    if (userId) {
      data.userId = userId;
    }
    dispatch(actions.updateCheckoutFormData(data));
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Personal Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your contact information for order updates and delivery.
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
            name="emailAddress"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Phone Number"
            name="phone"
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

export default PersonalDetailsForm;
