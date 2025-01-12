import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import TableActions from "../_components/TableActions";
import PageHeader from "../_components/PageHeader";

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
