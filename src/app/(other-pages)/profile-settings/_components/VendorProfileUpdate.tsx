"use client";

import React from "react";

import { User } from "next-auth";

import Steps from "../../onboarding/[id]/_components/Steps";

import StepForm from "../../onboarding/[id]/_components/StepForm";

const VendorProfileUpdate = ({ user }: { user: User | undefined }) => {
  const steps = [
    { index: 1, title: "Personal Details" },

    { index: 2, title: "Other Details" },

    { index: 3, title: "Vendor Details Summary" },
  ];

  return (
    <div className="p-3 sm:p-5">
      <Steps steps={steps} />

      <div className="w-full rounded-lg border border-border bg-muted/40 p-3 sm:p-5">
        <StepForm vendorId={user?.id} />
      </div>
    </div>
  );
};

export default VendorProfileUpdate;
