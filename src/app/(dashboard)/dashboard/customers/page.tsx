import React, { Suspense } from "react";

import { getAllUsers } from "@/services/user-service";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { safeServerRead } from "@/lib/api/resilient-read";

import { columns } from "./columns";
import Loading from "@/app/loading";
import Heading from "@/components/shared/Heading";
import { DataTable } from "@/components/tables/DataTable/page";

const Page = async () => {
  const users = await safeServerRead(() => getAllUsers(), {
    source: "customers:users",
    fallback: null,
  });

  if (!users) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage("Failed to fetch users")}
        reloadOnRetry
        variant="inline"
        showHomeLink={false}
        className="min-h-[40vh]"
      />
    );
  }

  return (
    <div>
      <Heading title="Customers" />
      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={users} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
