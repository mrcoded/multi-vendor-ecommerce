import React, { Suspense } from "react";

import Loading from "@/app/loading";

import { columns } from "./columns";
import PageHeader from "../_components/shared/PageHeader";
import { DataTable } from "@/components/tables/DataTable/page";
import { fetchAllVendorsAction } from "@/lib/actions/vendor-actions";

const Page = async () => {
  const { data: vendorProfile } = await fetchAllVendorsAction();
  const vendors = vendorProfile?.data ?? [];

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Vendors"
        href="/dashboard/vendors/new"
        linkAction="Add Vendor"
      />
      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={vendors} columns={columns} filterKeys={["name"]} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
