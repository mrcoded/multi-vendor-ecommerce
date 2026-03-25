"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/types/redux";

import { useVendor } from "@/hooks/useVendor";

import VendorDetailsSummary from "./StepForm/VendorDetailsSummary";
import BasicInformationForm from "./StepForm/BasicInformationForm";
import AdditionalInformationForm from "./StepForm/AdditionalInformationForm";

const StepForm = ({ vendorId }: { vendorId: string }) => {
  const { data: vendor } = useVendor(vendorId);
  const vendorProfile = vendor?.data?.vendorProfile;

  if (!vendorProfile) return <>Loading...</>;

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  const renderFormByStep = (step: number) => {
    if (step === 1) return <BasicInformationForm vendor={vendorProfile} />;
    if (step === 2) return <AdditionalInformationForm vendor={vendorProfile} />;
    if (step === 3) return <VendorDetailsSummary vendorId={vendorId} />;
  };
  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
