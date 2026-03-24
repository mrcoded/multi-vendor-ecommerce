import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "@/app/loading";

import CategoryForm from "@/components/forms/CategoryForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateCategory = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: categoryId } = await params;

  if (!categoryId) return notFound();

  return (
    <div>
      <FormHeader title="Update Category" />
      <Suspense fallback={<Loading />}>
        <CategoryForm categoryId={categoryId} />
      </Suspense>
    </div>
  );
};

export default UpdateCategory;
