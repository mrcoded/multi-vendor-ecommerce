import React, { Suspense } from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import Loading from "@/app/loading";
import PageHeader from "../../_components/shared/PageHeader";
import { fetchAllBannersAction } from "@/lib/actions/banner-actions";

const Page = async () => {
  const { data: banners } = await fetchAllBannersAction();
  const allBanners = banners ?? [];

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkAction="Add Banner"
      />

      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={allBanners} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
