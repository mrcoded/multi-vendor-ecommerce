import React, { Suspense } from "react";
import { auth } from "@/auth";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";
import { getAllCoupons } from "@/services/coupon-service";
import {
  classifyApiErrorFromMessage,
  sanitizeServerError,
} from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";

import Loading from "@/app/loading";
import PageHeader from "../../_components/shared/PageHeader";
import { RowDatas } from "@/types/table";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  let coupons: Awaited<ReturnType<typeof getAllCoupons>>;

  try {
    coupons = await getAllCoupons();
  } catch (error) {
    return (
      <ContentUnavailable
        reason={classifyApiErrorFromMessage(sanitizeServerError(error))}
        reloadOnRetry
        variant="inline"
        showHomeLink={false}
        className="min-h-[40vh]"
      />
    );
  }

  const vendorCoupons = coupons.filter(
    (coupon: { vendorId: string }) => coupon.vendorId === user?.id,
  );
  const couponsDataByRole = user?.role === "ADMIN" ? coupons : vendorCoupons;

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
