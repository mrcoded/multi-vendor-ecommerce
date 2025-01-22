import React from "react";
import getData from "@/lib/getData";

import CommunityPostForm from "@/components/forms/CommunityPostForm";
import FormHeader from "@/app/dashboard/_components/shared/FormHeader";

const UpdateCommunityPost = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const communityPost = await getData(`communityPosts/${id}`);
  const categoriesData = await getData("categories");

  const categories = categoriesData.map(
    (category: { id: string; title: string }) => ({
      id: category.id,
      title: category.title,
    })
  );

  return (
    <div>
      <FormHeader title="Update Community Post" />
      <CommunityPostForm updateData={communityPost} categories={categories} />
    </div>
  );
};

export default UpdateCommunityPost;
