import React, { Suspense } from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import Orders from "./_components/Orders";
import Loading from "@/app/loading";

async function OrdersPage() {
  //Get session
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <Suspense fallback={<Loading />}>
      <Orders user={user} />
    </Suspense>
  );
}

export default OrdersPage;
