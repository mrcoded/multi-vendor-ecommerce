export const dynamic = "force-dynamic";

import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";
import TableActions from "../_components/shared/TableActions";

const page = async () => {
  const communityPosts = await getData("communityPosts");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Community Posts"
        href="/dashboard/community/new"
        linkAction="Add Community Post"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={communityPosts} columns={columns} />
      </div>
    </div>
  );
};

export default page;
