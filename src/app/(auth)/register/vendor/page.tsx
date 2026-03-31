"use client";

import React, { Suspense } from "react";
import Loading from "@/app/loading";
import RegisterForm from "@/components/forms/RegisterForm";

function Page() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 sm:px-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Create a new account
          </h1>
        </div>

        <Suspense fallback={<Loading />}>
          <RegisterForm role="VENDOR" />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
