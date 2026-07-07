import React, { Suspense } from "react";
import { auth } from "@/auth";

import Orders from "./_components/Orders";
import Loading from "@/app/loading";

async function OrdersPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <Suspense fallback={<Loading />}>
      <Orders user={user} />
    </Suspense>
  );
}

export default OrdersPage;
