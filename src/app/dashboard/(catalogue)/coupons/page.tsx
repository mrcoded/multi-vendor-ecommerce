import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/PageHeader";
import TableActions from "../../_components/TableActions";

const page = async () => {
  const coupons = await getData("coupons");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkAction="Add Coupon"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <DataTable data={coupons} columns={columns} />
      </div>
    </div>
  );
};

export default page;
