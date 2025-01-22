import React from "react";
import getData from "@/lib/getData";

import StoreForm from "@/components/forms/StoreForm";
import FormHeader from "@/app/dashboard/_components/shared/FormHeader";

const UpdateStore = async ({ params: { id } }: { params: { id: string } }) => {
  const store = await getData(`stores/${id}`);

  const categoriesData = await getData("categories");

  const categories = categoriesData.map(
    (category: { id: string; title: string }) => ({
      id: category.id,
      title: category.title,
    })
  );

  return (
    <div>
      <FormHeader title="Update Store" />
      <StoreForm updateData={store} categories={categories} />
    </div>
  );
};

export default UpdateStore;
