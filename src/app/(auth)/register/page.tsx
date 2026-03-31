"use client";

import React, { Suspense } from "react";
import Loading from "@/app/loading";
import RegisterForm from "@/components/forms/RegisterForm";

const Page = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 sm:px-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create a new account
            </h1>
          </div>

          <Suspense fallback={<Loading />}>
            <RegisterForm role="USER" />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Page;
