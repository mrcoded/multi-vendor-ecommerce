export const dynamic = "force-dynamic";

import React from "react";
import getData from "@/lib/getData";

import CommunityPost from "@/components/community/CommunityPost";

async function page() {
  const communityPosts = await getData("communityPosts");

  return (
    <div>
      <CommunityPost
        posts={communityPosts}
        title="Read All Our Community Posts"
      />
    </div>
  );
}

export default page;
