import React, { Suspense } from "react";
import Loading from "@/app/loading";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

const Page = () => {
  return (
    <section className="min-h-screen bg-muted">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-2xl border border-border bg-card shadow-xl sm:max-w-md md:mt-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
              Reset Password
            </h1>
          </div>

          <Suspense fallback={<Loading />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Page;
