import React, { Suspense } from "react";
import { auth } from "@/auth";

import Loading from "@/app/loading";

import Dashboard from "./_components/Dashboard";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <Suspense fallback={<Loading />}>
      <Dashboard user={user} />;
    </Suspense>
  );
};

export default Page;
