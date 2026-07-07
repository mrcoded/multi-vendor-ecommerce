import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { RootState } from "@/types/redux";

import { actions } from "@/redux/slices/checkoutSlice";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const StepFormButton = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const handlePrevious = () => {
    dispatch(actions.setCurrentStep(currentStep - 1));
  };

  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:items-center",
        currentStep > 1 ? "sm:justify-between" : "sm:justify-end",
      )}
    >
      {currentStep > 1 && (
        <Button
          onClick={handlePrevious}
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
      )}

      <Button
        type="submit"
        variant="accent"
        size="sm"
        className="w-full sm:w-auto"
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};

export default StepFormButton;
