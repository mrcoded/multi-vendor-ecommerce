"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { useIsMounted } from "@/hooks/useIsMounted";
import { cn } from "@/lib/utils";

type Step = {
  index: number;
  title: string;
  shortTitle?: string;
};

const Steps = ({ steps }: { steps: Step[] }) => {
  const isMounted = useIsMounted();
  const cartItems = useSelector((store: RootState) => store.cart);

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const totalSteps = steps.length;
  const itemCount = isMounted ? cartItems.length : 0;

  return (
    <nav aria-label="Checkout progress">
      <div className="mb-4 flex items-center justify-center sm:justify-start">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Cart
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {itemCount}
          </span>
        </Link>
      </div>

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
                    "max-w-[5.5rem] text-center text-xs leading-tight",
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
                    "mx-2 mb-6 h-0.5 flex-1 rounded-full transition-colors",
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
