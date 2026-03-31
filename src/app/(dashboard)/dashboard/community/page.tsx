import React from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";
import { getAllCommunityPosts } from "@/services/community-service";

const Page = async () => {
  const communityPosts = await getAllCommunityPosts();

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Community Posts"
        href="/dashboard/community/new"
        linkAction="Add Post"
      />

      <div className="py-1">
        <DataTable data={communityPosts} columns={columns} />
      </div>
    </div>
  );
};

export default Page;
