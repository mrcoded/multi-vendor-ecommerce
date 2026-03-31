import React, { Suspense } from "react";

import { fetchAllUsersAction } from "@/lib/actions/user-actions";

import { columns } from "./columns";
import Loading from "@/app/loading";
import { DataTable } from "@/components/tables/DataTable/page";

const Page = async () => {
  const { data: users } = await fetchAllUsersAction();
  const allUsers = users ?? [];

  return (
    <Suspense fallback={<Loading />}>
      <div className="py-1">
        <DataTable data={allUsers} columns={columns} />
      </div>
    </Suspense>
  );
};

export default Page;
