import React, { Suspense } from "react";
import Loading from "@/app/loading";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { fetchAllStoresAction } from "@/lib/actions/store-actions";

import { columns } from "./columns";
import PageHeader from "../_components/shared/PageHeader";
import { DataTable } from "@/components/tables/DataTable/page";

const Page = async () => {
  const session = await getServerSession(authOptions);
  //GET user
  const user = session?.user;

  const { data: stores } = await fetchAllStoresAction();
  const allStores = stores ?? [];

  const vendorStores = allStores.filter((store) => store.vendorId === user?.id);

  const allStoresByRole = user?.role === "ADMIN" ? allStores : vendorStores;

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Stores"
        href="/dashboard/stores/new"
        linkAction="Add Store"
      />

      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={allStoresByRole} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
