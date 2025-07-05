export const dynamic = "force-dynamic";

import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";
import TableActions from "../_components/shared/TableActions";

const page = async () => {
  const staff = await getData("staff");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Staffs"
        href="/dashboard/staffs/new"
        linkAction="Add Staff"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={staff} columns={columns} />
      </div>
    </div>
  );
};

export default page;
