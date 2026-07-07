import React, { Suspense } from "react";
import { auth } from "@/auth";

import { getAllSales, getSalesByVendor } from "@/services/order-service.";
import { getVendorById } from "@/services/vendor-service";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { RowDatas } from "@/types/table";

import { columns } from "./columns";
import Loading from "@/app/loading";
import Heading from "@/components/shared/Heading";
import { DataTable } from "@/components/tables/DataTable/page";
import { safeServerRead } from "@/lib/api/resilient-read";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const role = session?.user?.role;

  const allSales = await safeServerRead(() => getAllSales(), {
    source: "sales:all",
    fallback: [],
  });

  let allSalesByRole: RowDatas[] = allSales as RowDatas[];

  if (role !== "ADMIN" && userId) {
    const vendor = await safeServerRead(() => getVendorById(userId), {
      source: "sales:vendor",
      fallback: null,
    });

    if (!vendor) {
      return (
        <ContentUnavailable
          reason={classifyApiErrorFromMessage("Vendor not found")}
          reloadOnRetry
          variant="inline"
          showHomeLink={false}
          className="min-h-[40vh]"
        />
      );
    }

    allSalesByRole = (await safeServerRead(() => getSalesByVendor(vendor.id), {
      source: "sales:vendor-sales",
      fallback: [],
    })) as RowDatas[];
  }

  return (
    <div>
      <Heading title="Sales" />
      <Suspense fallback={<Loading />}>
        <DataTable data={allSalesByRole} columns={columns} />
      </Suspense>
    </div>
  );
};

export default Page;
