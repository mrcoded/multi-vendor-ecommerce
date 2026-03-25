import React, { Suspense } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { steps } from "@/constants/checkout-steps";

import Loading from "@/app/loading";
import Steps from "./_components/Steps";
import StepForm from "./_components/StepForm";
import CartBanner from "./_components/CartBanner";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto p-3 sm:p-6 border border-slate-700 rounded-lg">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Banner */}
          <CartBanner />
          {/* FORM */}
          <Suspense fallback={<Loading />}>
            <StepForm user={user} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Page;
