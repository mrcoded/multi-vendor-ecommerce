import React, { Suspense } from "react";

import LoginForm from "@/components/forms/LoginForm";
import Loading from "@/app/loading";

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4">
          <h1 className="text-xl sm:text-2xl font-bold xl:font-extrabold tracking-tight text-gray-900 dark:text-white">
            Login
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Enter your details to access your dashboard.
          </p>
        </div>

        {/* Suspense is required because useSearchParams() is used inside LoginForm */}
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
};

export default LoginPage;
