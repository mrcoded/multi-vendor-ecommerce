"use client";

import React from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/types/redux";

import { useVendor } from "@/hooks/useVendor";

import VendorDetailsSummary from "./StepForm/VendorDetailsSummary";
import BasicInformationForm from "./StepForm/BasicInformationForm";
import AdditionalInformationForm from "./StepForm/AdditionalInformationForm";

const StepForm = ({ vendorId }: { vendorId: string | undefined }) => {
  const { data: vendor } = useVendor(vendorId);

  const vendorProfile = vendor?.vendorProfile ?? null;

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  return (
    <div key={currentStep} className="animate-fade-in">
      {currentStep === 1 && <BasicInformationForm vendor={vendorProfile} />}

      {currentStep === 2 && (
        <AdditionalInformationForm vendor={vendorProfile} />
      )}

      {currentStep === 3 && <VendorDetailsSummary vendorId={vendorId} />}
    </div>
  );
};

export default StepForm;
