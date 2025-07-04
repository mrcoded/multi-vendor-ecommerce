"use client";

import React from "react";

import { RootState } from "@/types/redux";
import { useSelector } from "react-redux";

import OrderSummary from "./OrderSummary";
import PaymentMethodForm from "@/components/forms/StepForm/PaymentMethodForm";
import PersonalDetailsForm from "@/components/forms/StepForm/PersonalDetailsForm";
import ShippingDetailsForm from "@/components/forms/StepForm/ShippingDetailsForm";

const StepForm = () => {
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const renderFormByStep = (step: number) => {
    if (step === 1) return <PersonalDetailsForm />;
    if (step === 2) return <ShippingDetailsForm />;
    if (step === 3) return <PaymentMethodForm />;
    if (step === 4) return <OrderSummary />;
  };
  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
