import type { Metadata } from "next";
import { Suspense } from "react";

import { auth } from "@/auth";
import { checkoutSteps } from "@/constants/checkout-steps";
import { noIndexMetadata } from "@/lib/seo";

import Loading from "@/app/loading";
import Steps from "./_components/Steps";
import StepForm from "./_components/StepForm";
import CartBanner from "./_components/CartBanner";

export const metadata: Metadata = noIndexMetadata(
  "Checkout",
  "Complete your BelStore purchase securely.",
  "/checkout",
);

async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="mx-auto w-full max-w-3xl py-4 sm:py-8">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Complete your purchase securely on BelStore.
        </p>
      </div>

      <Steps steps={checkoutSteps} />

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:mt-8">
        <CartBanner />
        <Suspense fallback={<Loading />}>
          <StepForm user={user} />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
