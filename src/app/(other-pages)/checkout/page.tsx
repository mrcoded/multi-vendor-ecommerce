import React from "react";

import { steps } from "@/constants/checkoutSteps";

import Steps from "./_components/Steps";
import StepForm from "./_components/StepForm";
import CartBanner from "./_components/CartBanner";

function Page() {
  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto p-6 border border-slate-700 rounded-lg">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Banner */}
          <CartBanner />
          {/* FORM */}
          <StepForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
