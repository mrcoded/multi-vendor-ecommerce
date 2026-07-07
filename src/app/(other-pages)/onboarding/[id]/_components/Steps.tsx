"use client";

import React from "react";
import { Check } from "lucide-react";

import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { RootState } from "@/types/redux";

type Step = {
  index: number;
  title: string;
  shortTitle?: string;
};

const Steps = ({ steps }: { steps: Step[] }) => {
  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep,
  );

  const totalSteps = steps.length;

  return (
    <nav aria-label="Onboarding progress">
      <p className="mb-4 text-center text-xs font-medium text-muted-foreground sm:hidden">
        Step {currentStep} of {totalSteps}
      </p>

      <ol className="hidden w-full items-center sm:flex">
        {steps.map((step, index) => {
          const isComplete = currentStep > step.index;
          const isCurrent = currentStep === step.index;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.index}
              className={cn("flex items-center", !isLast && "flex-1")}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isComplete && "bg-primary text-primary-foreground",
                    isCurrent &&
                      "border-2 border-primary bg-primary/10 text-primary",
                    !isComplete &&
                      !isCurrent &&
                      "border border-border bg-muted text-muted-foreground",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? (
                    <Check className="size-4" aria-hidden />
                  ) : (
                    step.index
                  )}
                </div>
                <span
                  className={cn(
                    "max-w-[7rem] text-center text-xs leading-tight",
                    isCurrent
                      ? "font-semibold text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "mx-3 mb-6 h-0.5 flex-1 rounded-full transition-colors",
                    isComplete ? "bg-primary" : "bg-border",
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="flex items-center justify-center gap-2 sm:hidden">
        {steps.map((step) => {
          const isComplete = currentStep > step.index;
          const isCurrent = currentStep === step.index;

          return (
            <div
              key={step.index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                isCurrent ? "w-8 bg-primary" : "w-4",
                isComplete && !isCurrent && "bg-primary/60",
                !isComplete && !isCurrent && "bg-border",
              )}
              aria-hidden
            />
          );
        })}
      </div>

      <p className="mt-3 text-center text-sm font-medium text-foreground sm:hidden">
        {steps.find((step) => step.index === currentStep)?.title}
      </p>
    </nav>
  );
};

export default Steps;
