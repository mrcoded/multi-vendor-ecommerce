export const dynamic = "force-dynamic";

import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/shared/PageHeader";
import TableActions from "../../_components/shared/TableActions";

const page = async () => {
  const banners = await getData("banners");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkAction="Add Banner"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
};

export default page;
