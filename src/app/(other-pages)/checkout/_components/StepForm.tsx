"use client";

import React from "react";

import { checkoutInitialStateProps, RootState } from "@/types/redux";
import { useSelector } from "react-redux";

import OrderSummary from "./OrderSummary";
import PaymentMethodForm from "@/components/forms/StepForm/PaymentMethodForm";
import PersonalDetailsForm from "@/components/forms/StepForm/PersonalDetailsForm";
import ShippingDetailsForm from "@/components/forms/StepForm/ShippingDetailsForm";

const StepForm = ({
  userOrder,
}: {
  userOrder: { profile: checkoutInitialStateProps["checkoutFormData"] };
}) => {
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const renderFormByStep = (step: number) => {
    if (step === 1) return <PersonalDetailsForm order={userOrder.profile} />;
    if (step === 2) return <ShippingDetailsForm order={userOrder.profile} />;
    if (step === 3) return <PaymentMethodForm />;
    if (step === 4) return <OrderSummary />;
  };
  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
