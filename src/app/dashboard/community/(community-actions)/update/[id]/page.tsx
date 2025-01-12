import React from "react";
import getData from "@/lib/getData";

import FormHeader from "@/app/dashboard/_components/FormHeader";
import CommunityPostForm from "@/components/forms/CommunityPostForm";

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
