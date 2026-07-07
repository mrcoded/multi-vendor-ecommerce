import React, { Suspense } from "react";

import LoginForm from "@/components/forms/LoginForm";
import Loading from "@/app/loading";

const LoginPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="p-4">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl xl:font-extrabold">
            Login
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your details to access your dashboard.
          </p>
        </div>

        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
};

export default LoginPage;
