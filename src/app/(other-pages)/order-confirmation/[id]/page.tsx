import React from "react";
import { notFound } from "next/navigation";

import OrderConfirmation from "../_components/OrderConfirmation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) return notFound();

  return (
    <section className="min-h-screen py-4 sm:py-8 bg-gray-50 lg:py-12">
      <div className="px-2 mx-auto max-w-3xl sm:px-6 lg:px-8">
        <OrderConfirmation id={id} />

        {/* Support Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Need help with your order?{" "}
          <a
            href="#"
            className="text-muted-foreground hover:underline underline-offset-4"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  );
};

export default Page;
