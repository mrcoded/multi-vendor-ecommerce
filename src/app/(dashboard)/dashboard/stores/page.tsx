import React, { Suspense } from "react";
import Loading from "@/app/loading";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import PageHeader from "../_components/shared/PageHeader";
import StoresTable from "./(stores-actions)/StoresTable";
import { fetchAllStoresAction } from "@/lib/actions/store-actions";

const Page = async () => {
  const session = await getServerSession(authOptions);
  //GET user
  const user = session?.user;

  const stores = fetchAllStoresAction();

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Stores"
        href="/dashboard/stores/new"
        linkAction="Add Store"
      />

      <Suspense fallback={<Loading />}>
        <StoresTable user={user} stores={stores} />
      </Suspense>
    </div>
  );
};

export default Page;
