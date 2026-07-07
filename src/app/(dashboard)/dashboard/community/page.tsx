import React from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";
import { getAllCommunityPosts } from "@/services/community-service";
import {
  classifyApiErrorFromMessage,
  sanitizeServerError,
} from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";

import PageHeader from "../_components/shared/PageHeader";

const Page = async () => {
  let communityPosts: Awaited<ReturnType<typeof getAllCommunityPosts>>;

  try {
    communityPosts = await getAllCommunityPosts();
  } catch (error) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage(sanitizeServerError(error))}
        reloadOnRetry
        variant="inline"
        showHomeLink={false}
        className="min-h-[40vh]"
      />
    );
  }

  return (
    <div>
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
