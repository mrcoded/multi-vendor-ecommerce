import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import { fetchOrderByIdAction } from "@/lib/actions/order-actions";

import Loading from "@/app/loading";
import SalesInvoice from "@/app/(dashboard)/dashboard/orders/[id]/invoice/_components/SalesInvoice";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) return notFound();

  const { data: order } = await fetchOrderByIdAction(id);

  return (
    <Suspense fallback={<Loading />}>
      <SalesInvoice order={order} />
    </Suspense>
  );
};

export default page;
