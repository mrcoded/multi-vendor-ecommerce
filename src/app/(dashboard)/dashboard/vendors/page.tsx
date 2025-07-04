import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";
import TableActions from "../_components/shared/TableActions";

const page = async () => {
  const vendorProfile = await getData("vendors");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Vendors"
        href="/dashboard/vendors/new"
        linkAction="Add Vendor"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable
          data={vendorProfile}
          columns={columns}
          filterKeys={["name"]}
        />
      </div>
    </div>
  );
};

export default page;
