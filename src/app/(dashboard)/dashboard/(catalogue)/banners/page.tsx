import React, { Suspense } from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";
import { getAllBanners } from "@/services/banner-service";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { safeServerRead } from "@/lib/api/resilient-read";

import Loading from "@/app/loading";
import PageHeader from "../../_components/shared/PageHeader";

const Page = async () => {
  const banners = await safeServerRead(() => getAllBanners(), {
    source: "banners:list",
    fallback: null,
  });

  if (!banners) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage("Unable to fetch Banners")}
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
        heading="Banners"
        href="/dashboard/banners/new"
        linkAction="Add Banner"
      />

      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={banners} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
