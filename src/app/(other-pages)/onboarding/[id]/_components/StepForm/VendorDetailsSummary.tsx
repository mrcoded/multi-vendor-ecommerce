"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";

import { RootState } from "@/types/redux";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/redux/slices/onboardingSlice";

import generateUserCode from "@/lib/generateUserCode";

const VendorDetailsSummary = ({ vendorId }: { vendorId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onboardingFormData = useSelector(
    (store: RootState) => store.onboarding.onboardingFormData
  );

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep
  );

  const handlePrevious = () => {
    dispatch(actions.setCurrentStep(currentStep - 1));
  };

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = (id: string) => {
    router.push(`/dashboard`);
  };

  const onSubmit = () => {
    const data = { ...onboardingFormData };
    const fullName = `${data.firstName} ${data.lastName}`;
    const code = generateUserCode("MVE", fullName);
    data.code = code;
    data.userId = vendorId;

    makePostRequest({
      setLoading,
      endpoint: `api/vendors`,
      data,
      resourceName: "Vendor",
      reset,
      redirectUrl,
    });
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Details Summary
      </h2>

      <div className="flex">
        <h2>Here are your details</h2>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <span>Previous</span>
          <ChevronRight className="size-5 ml-2" />
        </button>
        {loading ? (
          <button
            disabled
            type="button"
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Processing Please wait...</span>
            <Loader2 className="inline size-5 ml-2 text-white animate-spin" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            type="submit"
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Submit Data</span>
            <ChevronRight className="size-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorDetailsSummary;
