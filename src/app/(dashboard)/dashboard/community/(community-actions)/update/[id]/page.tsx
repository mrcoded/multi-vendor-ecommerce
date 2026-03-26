import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import Loading from "@/app/loading";
import CommunityPostForm from "@/components/forms/CommunityPostForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateCommunityPost = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: communityPostId } = await params;

  if (!communityPostId) return notFound();

  return (
    <>
      <FormHeader title="Update Community Post" />
      <Suspense fallback={<Loading />}>
        <CommunityPostForm postId={communityPostId} />
      </Suspense>
    </>
  );
};

export default UpdateCommunityPost;
