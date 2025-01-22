import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../_components/shared/PageHeader";
import TableActions from "../_components/shared/TableActions";

const page = async () => {
  const stores = await getData("stores");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Stores"
        href="/dashboard/stores/new"
        linkAction="Add Store"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={stores} columns={columns} />
      </div>
    </div>
  );
};

export default page;
