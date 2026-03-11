import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";

const Page = async () => {
  const communityPosts = await getData("communityPosts");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Community Posts"
        href="/dashboard/community/new"
        linkAction="Add Community Post"
      />

      <div className="py-1">
        <DataTable data={communityPosts} columns={columns} />
      </div>
    </div>
  );
};

export default Page;
