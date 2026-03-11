export const dynamic = "force-dynamic";

import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/shared/PageHeader";
import TableActions from "../../_components/shared/TableActions";

const Page = async () => {
  const categories = await getData("categories");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkAction="Add Category"
      />

      <div className="py-1">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
};

export default Page;
