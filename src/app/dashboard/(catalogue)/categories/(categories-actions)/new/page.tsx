import React from "react";

import FormHeader from "@/app/dashboard/_components/shared/FormHeader";
import CategoryForm from "@/components/forms/CategoryForm";

const NewCategory = () => {
  return (
    <div>
      <FormHeader title="New Category" />
      <CategoryForm />
    </div>
  );
};

export default NewCategory;
