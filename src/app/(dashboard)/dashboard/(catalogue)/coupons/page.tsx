import React, { Suspense } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import Loading from "@/app/loading";
import PageHeader from "../../_components/shared/PageHeader";
import { getAllCoupons } from "@/services/coupon-service";
import { RowDatas } from "@/types/table";

const Page = async () => {
  const session = await getServerSession(authOptions);
  //GET userID and Role
  const user = session?.user;

  const coupons = await getAllCoupons();

  //Filter by vendorId => to get coupons for this vendor
  const vendorCoupons = coupons.filter(
    (coupon: { vendorId: string }) => coupon.vendorId === user?.id,
  );

  //Get stores by user role
  const couponsDataByRole = user?.role === "ADMIN" ? coupons : vendorCoupons;

  //Convert Date fields to strings for RowDatas compatibility
  const formattedCoupons = couponsDataByRole.map((coupon) => ({
    ...coupon,
    expiryDate: coupon.expiryDate.toISOString().split("T")[0],
    createdAt: coupon.createdAt.toISOString().split("T")[0],
    updatedAt: coupon.updatedAt
      ? coupon.updatedAt.toISOString().split("T")[0]
      : null,
  }));

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkAction="Add Coupon"
      />
      <Suspense fallback={<Loading />}>
        <div className="py-1">
          <DataTable data={formattedCoupons as RowDatas[]} columns={columns} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
