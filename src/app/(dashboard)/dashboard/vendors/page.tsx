import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";

const Page = async () => {
  const vendorProfile = await getData("vendors");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Vendors"
        href="/dashboard/vendors/new"
        linkAction="Add Vendor"
      />

      <div className="py-1">
        <DataTable
          data={vendorProfile}
          columns={columns}
          filterKeys={["name"]}
        />
      </div>
    </div>
  );
};

export default Page;
