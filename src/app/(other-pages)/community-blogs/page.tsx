import React, { Suspense } from "react";

import Loading from "@/app/loading";
import CommunityPost from "@/components/community/CommunityPost";
import { getAllCommunityPostsAction } from "@/lib/actions/community-actions";

async function Page() {
  const { data: communityPosts } = await getAllCommunityPostsAction();

  return (
    <Suspense fallback={<Loading />}>
      <CommunityPost
        posts={communityPosts}
        title="Read All Our Community Posts"
      />
    </Suspense>
  );
}

export default Page;
