import React, { Suspense } from "react";
import Loading from "@/app/loading";

import { columns } from "./columns";
import PageHeader from "../../_components/shared/PageHeader";
import { DataTable } from "@/components/tables/DataTable/page";
import { getAllCategories } from "@/services/category-service";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { safeServerRead } from "@/lib/api/resilient-read";

const Page = async () => {
  const categories = await safeServerRead(() => getAllCategories(), {
    source: "categories:list",
    fallback: null,
  });

  if (!categories) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage("Unable to fetch categories")}
        reloadOnRetry
        variant="inline"
        showHomeLink={false}
        className="min-h-[40vh]"
      />
    );
  }

  return (
    <div>
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkAction="Add Category"
      />

      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={categories} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
