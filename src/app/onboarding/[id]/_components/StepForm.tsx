"use client";

import React from "react";

import { RootState } from "@/redux/types";
import { useSelector } from "react-redux";

import VendorDetailsSummary from "./StepForm/VendorDetailsSummary";
import BasicInformationForm from "./StepForm/BasicInformationForm";
import AdditionalInformationForm from "./StepForm/AdditionalInformationForm";

const StepForm = ({ vendorId }: { vendorId: string }) => {
  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep
  );

  const renderFormByStep = (step: number) => {
    if (step === 1) return <BasicInformationForm />;
    if (step === 2) return <AdditionalInformationForm />;
    if (step === 3) return <VendorDetailsSummary vendorId={vendorId} />;
  };
  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
