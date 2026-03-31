import React, { Suspense } from "react";

import Loading from "@/app/loading";
import VendorsTable from "./VendorsTable";
import PageHeader from "../_components/shared/PageHeader";

const Page = async () => {
  return (
    <>
      {/* Header */}
      <PageHeader
        heading="Vendors"
        href="/dashboard/vendors/new"
        linkAction="Add Vendor"
      />
      <Suspense fallback={<Loading />}>
        <VendorsTable />
      </Suspense>
    </>
  );
};

export default Page;
