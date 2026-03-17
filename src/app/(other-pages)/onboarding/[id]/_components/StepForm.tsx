"use client";

import React from "react";

import { RootState } from "@/types/redux";
import { useSelector } from "react-redux";

import VendorDetailsSummary from "./StepForm/VendorDetailsSummary";
import BasicInformationForm from "./StepForm/BasicInformationForm";
import AdditionalInformationForm from "./StepForm/AdditionalInformationForm";

const StepForm = ({ vendor }: { vendor: any }) => {
  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  const renderFormByStep = (step: number) => {
    if (step === 1) return <BasicInformationForm vendor={vendor} />;
    if (step === 2) return <AdditionalInformationForm />;
    if (step === 3) return <VendorDetailsSummary vendorId={vendor.id} />;
  };
  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
