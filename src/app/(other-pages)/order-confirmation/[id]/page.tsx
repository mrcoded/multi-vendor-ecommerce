import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import OrderConfirmation from "../_components/OrderConfirmation";
import { noIndexMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return noIndexMetadata(
    "Order Confirmation",
    "Your BelStore order confirmation details.",
    `/order-confirmation/${id}`,
  );
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) return notFound();

  return (
    <section className="min-h-screen bg-muted py-4 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-3xl px-2 sm:px-6 lg:px-8">
        <Suspense fallback={<Loading />}>
          <OrderConfirmation id={id} />
        </Suspense>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need help with your order?{" "}
          <a
            href="#"
            className="text-primary underline-offset-4 hover:underline"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  );
};

export default Page;
