import React, { Suspense } from "react";
import { getServerSession } from "next-auth";

import Loading from "@/app/loading";
import { authOptions } from "@/lib/authOptions";

import Dashboard from "./_components/Dashboard";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <Suspense fallback={<Loading />}>
      <Dashboard user={user} />
    </Suspense>
  );
};

export default Page;
