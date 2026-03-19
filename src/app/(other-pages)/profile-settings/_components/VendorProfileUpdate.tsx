import React, { Suspense } from "react";
import Loading from "@/app/loading";

import Steps from "../../onboarding/[id]/_components/Steps";
import StepForm from "../../onboarding/[id]/_components/StepForm";
import { VendorProps } from "@/types/vendors";

const VendorProfileUpdate = ({ vendor }: { vendor: VendorProps }) => {
  const steps = [
    { index: 1, title: "Personal Details" },
    { index: 2, title: "Other Details" },
    { index: 3, title: "Vendor Details Summary" },
  ];

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen lg:min-h-full">
      <div className="max-w-3xl my-4 sm:my-6 mx-auto p-3.5 sm:p-6 border border-slate-700 rounded-lg">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-3.5 sm:p-6 bg-white border border-gray-200 rounded-lg shadow md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* FORM */}
          <Suspense fallback={<Loading />}>
            <StepForm vendor={vendor} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default VendorProfileUpdate;
