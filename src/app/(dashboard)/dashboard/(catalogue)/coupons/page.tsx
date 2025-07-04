import React from "react";
import getData from "@/lib/getData";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/shared/PageHeader";
import TableActions from "../../_components/shared/TableActions";

const page = async () => {
  const coupons = await getData("coupons");
  const session = await getServerSession(authOptions);

  //GET userID and Role
  const id = session?.user?.id;
  const role = session?.user?.role;

  if (!session) {
    return null;
  }

  const vendorCoupons = coupons?.filter(
    (coupon: { vendorId: string }) => coupon.vendorId === id
  );

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
        {role === "ADMIN" ? (
          <DataTable data={coupons} columns={columns} />
        ) : (
          <DataTable data={vendorCoupons} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default page;
