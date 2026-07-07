"use client";

import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  FileText,
  Store,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";

import generateUserCode from "@/lib/generateUserCode";

import { useUpdateVendor } from "@/hooks/useVendor";
import { actions } from "@/redux/slices/onboardingSlice";

import { RootState } from "@/types/redux";
import SummaryItem from "../SummaryItem";
import { Button } from "@/components/ui/button";

const VendorDetailsSummary = ({
  vendorId,
}: {
  vendorId: string | undefined;
}) => {
  const dispatch = useDispatch();
  const { mutate: updateVendor, isPending } = useUpdateVendor(vendorId ?? "", {
    redirectTo: "/dashboard",
    refreshSession: true,
  });

  const onboardingFormData = useSelector(
    (store: RootState) => store.onboarding.onboardingFormData,
  );

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  const handlePrevious = () => {
    dispatch(actions.setCurrentStep(currentStep - 1));
  };

  const onSubmit = () => {
    const data = { ...onboardingFormData };
    const fullName = `${data.firstName} ${data.lastName}`;
    const code = generateUserCode("MVE", fullName);
    data.code = code;
    if (vendorId) {
      data.userId = vendorId;
    }

    updateVendor(data);
  };

  const sectionTitleClass =
    "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Review Your Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm everything looks correct before completing your registration.
        </p>
      </div>

      <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className={sectionTitleClass}>
              <span className="h-px w-6 bg-border" aria-hidden />
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

          <div className="space-y-3">
            <h3 className={sectionTitleClass}>
              <span className="h-px w-6 bg-border" aria-hidden />
              Business
            </h3>
            <SummaryItem
              icon={Store}
              label="Products"
              value={onboardingFormData.products}
            />
            <SummaryItem
              icon={MapPin}
              label="Physical Address"
              value={onboardingFormData.physicalAddress}
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <h3 className={sectionTitleClass}>
              <span className="h-px w-6 bg-border" aria-hidden />
              Secondary Contact
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <div className="overflow-hidden rounded-xl border border-primary/20 bg-primary/5 md:col-span-2">
            <div className="flex items-start gap-3 border-b border-primary/10 p-4">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Payment Terms
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {onboardingFormData.terms || "No payment terms specified."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <FileText
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Additional Notes
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {onboardingFormData.notes || "No additional notes provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-stretch gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            onClick={handlePrevious}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="size-4" />
            Edit Details
          </Button>

          {isPending ? (
            <Button disabled size="sm" className="w-full sm:w-auto">
              Processing
              <Loader2 className="size-4 animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              variant="accent"
              size="sm"
              className="w-full sm:w-auto"
            >
              Complete Registration
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsSummary;
