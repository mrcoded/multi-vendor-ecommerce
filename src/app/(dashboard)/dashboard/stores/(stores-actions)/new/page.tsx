import React from "react";

import getData from "@/lib/getData";

import StoreForm from "@/components/forms/StoreForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

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
      <StoreForm categories={categories} />
    </div>
  );
};

export default NewStore;
