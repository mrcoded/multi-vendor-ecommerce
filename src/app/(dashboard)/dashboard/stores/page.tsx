import React, { Suspense } from "react";
import Loading from "@/app/loading";
import { auth } from "@/auth";

import { getAllStores } from "@/services/store-service";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { safeServerRead } from "@/lib/api/resilient-read";

import { columns } from "./columns";
import PageHeader from "../_components/shared/PageHeader";
import { DataTable } from "@/components/tables/DataTable/page";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  const allStores = await safeServerRead(() => getAllStores(), {
    source: "stores:list",
    fallback: null,
  });

  if (!allStores) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage("Failed to fetch stores")}
        reloadOnRetry
        variant="inline"
        showHomeLink={false}
        className="min-h-[40vh]"
      />
    );
  }

  const vendorStores = allStores.filter((store) => store.vendorId === user?.id);
  const allStoresByRole = user?.role === "ADMIN" ? allStores : vendorStores;

  return (
    <div>
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
