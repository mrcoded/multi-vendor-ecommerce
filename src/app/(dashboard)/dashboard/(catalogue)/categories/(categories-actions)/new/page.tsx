import React, { Suspense } from "react";
import Loading from "@/app/loading";

import CategoryForm from "@/components/forms/CategoryForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewCategory = () => {
  return (
    <div>
      <FormHeader title="New Category" />
      <Suspense fallback={<Loading />}>
        <CategoryForm />
      </Suspense>
    </div>
  );
};

export default NewCategory;
