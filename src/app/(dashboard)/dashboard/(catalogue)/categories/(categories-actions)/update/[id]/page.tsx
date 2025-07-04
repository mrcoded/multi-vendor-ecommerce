import React from "react";
import getData from "@/lib/getData";

import CategoryForm from "@/components/forms/CategoryForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

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
