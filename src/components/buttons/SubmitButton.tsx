import React from "react";
import { Loader2, Plus } from "lucide-react";

function SubmitButton({
  isLoading = false,
  buttonTitle,
  loadingButtonTitle,
}: {
  isLoading: boolean;
  buttonTitle: string;
  loadingButtonTitle: string;
}) {
  return (
    <div className="sm:col-span-1">
      {isLoading ? (
        <button
          disabled
          type="button"
          className=" inline-flex items-center mt-4 text-xs sm:text-sm px-5 py-2.5 text-center mr-2 text-white bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
        >
          <Loader2 className="inline size-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-white animate-spin" />
          {loadingButtonTitle}
        </button>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center px-3 sm:px-5 py-2.5 mt-4 sm:mt-6 text-xs sm:text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <Plus className="size-4 sm:w-5 sm:h-5 smr-1 m:mr-2" />
          <span>{buttonTitle}</span>
        </button>
      )}
    </div>
  );
}

export default SubmitButton;
