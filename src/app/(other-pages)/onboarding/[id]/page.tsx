import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import { onboardingSteps } from "@/constants/onboarding-steps";
import { noIndexMetadata } from "@/lib/seo";

import Steps from "./_components/Steps";
import StepForm from "./_components/StepForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return noIndexMetadata(
    "Vendor Onboarding",
    "Complete your BelStore vendor onboarding steps.",
    `/onboarding/${id}`,
  );
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) return notFound();

  return (
    <section className="mx-auto w-full max-w-3xl py-4 sm:py-8">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Become a Vendor
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Complete your profile to start selling on BelStore.
        </p>
      </div>

      <Steps steps={onboardingSteps} />

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:mt-8">
        <Suspense fallback={<Loading />}>
          <StepForm vendorId={id} />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
