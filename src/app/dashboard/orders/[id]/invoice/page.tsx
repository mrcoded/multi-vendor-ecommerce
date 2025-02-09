import React from "react";
import getData from "@/lib/getData";

import SalesInvoice from "@/app/dashboard/orders/[id]/invoice/_components/SalesInvoice";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const order = await getData(`orders/${id}`);

  return (
    <div className="flex flex-col">
      <SalesInvoice order={order} />
    </div>
  );
};

export default page;
