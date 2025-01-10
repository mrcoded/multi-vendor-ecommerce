import React from "react";
import getData from "@/lib/getData";

import FormHeader from "@/app/dashboard/_components/FormHeader";
import CategoryForm from "@/components/forms/CategoryForm";

const UpdateCategory = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const category = await getData(`categories/${id}`);

  return (
    <div>
      <FormHeader title="Update Category" />
      <CategoryForm updateData={category} />
    </div>
  );
};

export default UpdateCategory;
