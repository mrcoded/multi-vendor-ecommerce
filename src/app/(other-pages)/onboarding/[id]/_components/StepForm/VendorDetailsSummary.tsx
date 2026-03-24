"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  FileText,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { makePostRequest } from "@/lib/apiRequest";
import generateUserCode from "@/lib/generateUserCode";

import { useUpdateVendor } from "@/hooks/useVendor";
import { actions } from "@/redux/slices/onboardingSlice";

import { RootState } from "@/types/redux";
import SummaryItem from "../SummaryItem";

const VendorDetailsSummary = ({ vendorId }: { vendorId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { mutate: updateVendor, isPending } = useUpdateVendor(vendorId);

  const onboardingFormData = useSelector(
    (store: RootState) => store.onboarding.onboardingFormData,
  );

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  const handlePrevious = () => {
    dispatch(actions.setCurrentStep(currentStep - 1));
  };

  const { reset } = useForm();

  const redirectUrl = () => router.push(`/dashboard`);

  const onSubmit = () => {
    const data = { ...onboardingFormData };
    const fullName = `${data.firstName} ${data.lastName}`;
    const code = generateUserCode("MVE", fullName);
    data.code = code;
    data.userId = vendorId;

    // updateVendor(data);
  };

  return (
    <div className="my-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Review Your Details
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Please confirm that the information below is correct before completing
          your registration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Section: Personal Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700"></span>
            Identity
          </h3>
          <SummaryItem
            icon={User}
            label="Full Name"
            value={`${onboardingFormData.firstName} ${onboardingFormData.lastName}`}
          />
          <SummaryItem
            icon={Mail}
            label="Email Address"
            value={onboardingFormData.email}
          />
          <SummaryItem
            icon={Phone}
            label="Primary Phone"
            value={onboardingFormData.phone}
          />
        </div>

        {/* Section: Business Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700"></span>
            Business Details
          </h3>

          <SummaryItem
            icon={CheckCircle2}
            label="Products"
            value={onboardingFormData.products}
          />
          <SummaryItem
            icon={MapPin}
            label="Physical Address"
            value={onboardingFormData.physicalAddress}
          />
        </div>

        {/* Section: Contact Person */}
        <div className="md:col-span-2 space-y-4 pt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700"></span>
            Secondary Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SummaryItem
              icon={User}
              label="Contact Person"
              value={onboardingFormData.contactPerson}
            />
            <SummaryItem
              icon={Phone}
              label="Contact Person Phone"
              value={onboardingFormData.contactPersonPhone}
            />
          </div>
        </div>

        {/* Section: Notes & Terms */}
        <div className="md:col-span-2 bg-lime-50 dark:bg-lime-900/10 border border-lime-100 dark:border-lime-900/30">
          <div className="flex items-start p-4 rounded-xl mt-4 gap-3">
            <CheckCircle2 className="size-3 sm:size-4 text-lime-600 dark:text-lime-400 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                Vendor Terms
              </h4>
              <p className="text-[10px] font-bold uppercase text-lime-700 dark:text-lime-400">
                {onboardingFormData.terms}
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl mt-4 gap-3">
            <FileText className="size-3 sm:size-4 text-lime-600 dark:text-lime-400 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                Additional Notes
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {onboardingFormData.notes || "No additional notes provided."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handlePrevious}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="size-4" />
          <span>Edit Details</span>
        </button>

        {loading ? (
          <button
            disabled
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-slate-400 dark:bg-slate-700 rounded-xl cursor-not-allowed"
          >
            <span>Processing</span>
            <Loader2 className="size-4 animate-spin" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-lime-600 hover:bg-lime-700 rounded-xl shadow-lg shadow-lime-200 dark:shadow-none transition-all transform active:scale-95"
          >
            <span>Complete Registration</span>
            <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorDetailsSummary;
