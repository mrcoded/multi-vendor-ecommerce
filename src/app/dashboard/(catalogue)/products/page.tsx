import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/shared/PageHeader";
import TableActions from "../../_components/shared/TableActions";

const page = async () => {
  const products = await getData("products");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkAction="Add Product"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  );
};

export default page;
