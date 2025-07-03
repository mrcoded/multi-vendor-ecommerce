import React from "react";
import { ChevronRight } from "lucide-react";

import { RootState } from "@/redux/types";
import { actions } from "@/redux/slices/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";

const StepFormButton = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep
  );

  const handlePrevious = () => {
    dispatch(actions.setCurrentStep(currentStep - 1));
  };

  return (
    <div className="flex justify-between items-center">
      {currentStep > 1 && (
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <span>Previous</span>
          <ChevronRight className="size-5 ml-2" />
        </button>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
      >
        <span>Next</span>
        <ChevronRight className="size-5 ml-2" />
      </button>
    </div>
  );
};

export default StepFormButton;
