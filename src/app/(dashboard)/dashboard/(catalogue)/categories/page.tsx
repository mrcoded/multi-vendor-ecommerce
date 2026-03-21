import React, { Suspense } from "react";
import Loading from "@/app/loading";

import PageHeader from "../../_components/shared/PageHeader";
import CategoriesTable from "./(categories-actions)/CategoriesTable";

const Page = async () => {
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkAction="Add Category"
      />

      <Suspense fallback={<Loading />}>
        <CategoriesTable />
      </Suspense>
    </div>
  );
};

export default Page;
