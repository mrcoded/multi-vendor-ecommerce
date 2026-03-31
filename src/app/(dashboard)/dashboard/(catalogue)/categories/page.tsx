import React, { Suspense } from "react";
import Loading from "@/app/loading";

import { columns } from "./columns";
import PageHeader from "../../_components/shared/PageHeader";
import { DataTable } from "@/components/tables/DataTable/page";
import { fetchAllCategoriesAction } from "@/lib/actions/category-actions";

const Page = async () => {
  const { data: categories } = await fetchAllCategoriesAction();
  // Fallback to empty array if stores is somehow null/undefined
  const allCategories = categories ?? [];

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkAction="Add Category"
      />

      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={allCategories} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
