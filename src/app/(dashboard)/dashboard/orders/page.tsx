import React, { Suspense } from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import { fetchAllOrdersAction } from "@/lib/actions/order-actions";

import Orders from "./_components/Orders";
import Loading from "@/app/loading";

async function OrdersPage() {
  //Get session
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { data: orders } = await fetchAllOrdersAction();

  return (
    <Suspense fallback={<Loading />}>
      <Orders user={user} orders={orders?.data ?? []} />
    </Suspense>
  );
}

export default OrdersPage;
