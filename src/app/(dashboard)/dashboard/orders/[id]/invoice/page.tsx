import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import { auth } from "@/auth";

import Loading from "@/app/loading";
import { getOrderForUser } from "@/services/order-service.";
import SalesInvoice from "@/app/(dashboard)/dashboard/orders/[id]/invoice/_components/SalesInvoice";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();
  const user = session?.user;

  if (!user?.id) return notFound();

  const order = await getOrderForUser(id, {
    id: user.id,
    role: user.role ?? "USER",
  });

  if (!order) return notFound();

  return (
    <Suspense fallback={<Loading />}>
      <SalesInvoice order={order} />
    </Suspense>
  );
};

export default Page;
