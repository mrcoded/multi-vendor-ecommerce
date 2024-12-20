import React from "react";

import getData from "@/lib/getData";

import NewStoreForm from "@/components/forms/NewStoreForm";
import FormHeader from "@/app/dashboard/_components/FormHeader";

const NewStore = async () => {
  const categoriesData = await getData("categories");

  const categories = categoriesData.map(
    (category: { id: string; title: string }) => ({
      id: category.id,
      title: category.title,
    })
  );

  return (
    <div>
      <FormHeader title="New Store" />
      <NewStoreForm categories={categories} />
    </div>
  );
};

export default NewStore;
