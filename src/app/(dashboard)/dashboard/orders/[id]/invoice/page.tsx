import React from "react";
import getData from "@/lib/getData";

import SalesInvoice from "@/app/(dashboard)/dashboard/orders/[id]/invoice/_components/SalesInvoice";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const order = await getData(`orders/${id}`);

  return (
    <div className="flex flex-col">
      <SalesInvoice order={order} />
    </div>
  );
};

export default page;
