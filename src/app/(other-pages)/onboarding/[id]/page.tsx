import React from "react";

import Steps from "./_components/Steps";
import StepForm from "./_components/StepForm";

function page({ params }: { params: { id: string } }) {
  const steps = [
    { index: 1, title: "Personal Details" },
    { index: 2, title: "Other Details" },
    { index: 3, title: "Vendor Details Summary" },
  ];

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto p-6 border border-slate-700 rounded-lg">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* FORM */}
          <StepForm vendorId={params.id} />
        </div>
      </div>
    </div>
  );
}

export default page;
