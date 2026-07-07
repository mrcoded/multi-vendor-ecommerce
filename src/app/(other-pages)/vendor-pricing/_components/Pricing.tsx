"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { plans } from "@/constants/pricing-plan";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function Pricing() {
  const router = useRouter();

  return (
    <div className="p-2 sm:p-10 sm:flex md:flex-col sm:items-center">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center self-center rounded-lg bg-secondary p-0.5">
          <button
            type="button"
            className="relative w-full rounded-md border border-border bg-card px-4 py-2 text-sm font-medium whitespace-nowrap text-foreground shadow-sm focus:outline-none sm:w-auto sm:px-8"
          >
            Choose a plan which suits you!
          </button>
        </div>
        <div className="mt-4 max-w-3xl text-center text-lg font-semibold text-muted-foreground">
          Discover simplicity in pricing with us. Our straightforward and
          competitive rates ensure you get the best value. No hidden fees, just
          transparent options to meet your needs.
        </div>
        <div className="mt-12 space-y-3 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 md:mx-auto md:max-w-5xl xl:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className="divide-y divide-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold leading-6 text-foreground">
                    {plan.title}
                  </h2>
                  {plan.isRecommended && (
                    <Badge className="border-0 bg-accent uppercase text-accent-foreground">
                      recommended
                    </Badge>
                  )}
                </div>

                <p className="mt-2 text-base leading-tight text-muted-foreground">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold tracking-tighter text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-muted-foreground">
                    /mo
                  </span>
                </p>
              </CardContent>
              <CardContent className="px-6 pb-8 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  What&apos;s Included
                </h3>
                {plan.features.map((feature, featureIndex) => (
                  <p
                    key={featureIndex}
                    className="mt-3 flex text-sm text-muted-foreground"
                  >
                    <CheckIcon className="mr-2 text-primary" />
                    {feature}
                  </p>
                ))}
                <Button
                  variant="accent"
                  className="mt-4 w-full rounded-full"
                  onClick={() =>
                    router.push(`/register/vendor?plan=${plan.planType}`)
                  }
                >
                  {plan.planType === "free" ? "Start for free" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
