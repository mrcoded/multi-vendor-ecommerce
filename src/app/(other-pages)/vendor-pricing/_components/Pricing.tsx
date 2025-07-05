"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { plans } from "@/constants/pricingPlan";

function Pricing() {
  const router = useRouter();

  return (
    <div className="sm:flex md:flex-col sm:align-middle p-2 m:p-10">
      <div className="flex flex-col items-center">
        <div className="relative items-center self-center bg-slate-200 dark:slate-900 rounded-lg p-0.5 flex">
          <button
            type="button"
            className="relative rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none px-4 sm:w-auto sm:px-8 bg-slate-50 border-slate-50 text-slate-900 shadow-sm w-full"
          >
            Choose a plan which suits you!
          </button>
        </div>
        <div className="max-w-3xl text-center mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
          Discover simplicity in pricing with us us. Our straightforward and
          competitve rates ensure you get the best value. No hidden fees, juts
          transaparent options to meet your needs. Choose clarity, choose MVE
        </div>
        <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          {/* starter package */}
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl leading-6 font-bold text-slate-900 dark:text-white">
                    {plan.title}
                  </h2>
                  {plan.isRecommended && (
                    <span className="uppercase border dark:bg-transparent bg-lime-500 text-white border-lime-500 text-xs rounded-full px-3 py-1">
                      recommended
                    </span>
                  )}
                </div>

                <p className="mt-2 text-base text-slate-700 dark:text-slate-300 leading-tight">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-slate-900 dark:text-lime-400 tracking-tighter">
                    {plan.price}
                  </span>

                  <span className="text-base font-medium text-slate-500">
                    /mo
                  </span>
                </p>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                  What&apos;s Included
                </h3>
                {plan.features.map((feature, index) => (
                  <p
                    key={index}
                    className="flex mt-3 text-sm text-slate-500 dark:text-slate-400"
                  >
                    <CheckIcon className="mr-2 text-slate-400 dark:text-lime-400" />
                    {feature}
                  </p>
                ))}
                <button
                  onClick={() =>
                    router.push(`/register/vendor?plan=${plan.planType}`)
                  }
                  className="mt-4 bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-full w-full"
                >
                  {plan.planType === "free" ? "Start for free" : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
