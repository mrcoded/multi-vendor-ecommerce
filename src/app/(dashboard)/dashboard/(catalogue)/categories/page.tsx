import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/shared/PageHeader";
import TableActions from "../../_components/shared/TableActions";

const page = async () => {
  const categories = await getData("categories");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkAction="Add Category"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
};

export default page;
