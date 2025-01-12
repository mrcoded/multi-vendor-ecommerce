import React from "react";

import getData from "@/lib/getData";

import FormHeader from "@/app/dashboard/_components/FormHeader";
import CommunityPostForm from "@/components/forms/CommunityPostForm";

const NewCommunityPost = async () => {
  const categoriesData = await getData("categories");

  const categories = categoriesData.map(
    (category: { id: string; title: string }) => ({
      id: category.id,
      title: category.title,
    })
  );

  return (
    <div>
      <FormHeader title="New Community Post" />
      <CommunityPostForm categories={categories} />
    </div>
  );
};

export default NewCommunityPost;
