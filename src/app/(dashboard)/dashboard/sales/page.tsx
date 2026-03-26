import React, { Suspense } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  fetchAllSalesAction,
  fetchVendorSalesAction,
} from "@/lib/actions/order-actions";
import { fetchVendorByIdAction } from "@/lib/actions/vendor-actions";

import { columns } from "./columns";
import Heading from "@/components/shared/Heading";
import { DataTable } from "@/components/tables/DataTable/page";

const Page = async () => {
  const session = await getServerSession(authOptions);
  //GET user
  const userId = session?.user?.id;
  const role = session?.user?.role;

  const { data: vendor } = await fetchVendorByIdAction(userId);
  const { data: sales } = await fetchAllSalesAction();
  const { data: vendorSales } = await fetchVendorSalesAction(vendor?.data?.id);

  const allSales = sales?.data ?? [];
  const allVendorSales = vendorSales?.data ?? [];

  const allSalesByRole = role === "ADMIN" ? allSales : allVendorSales;

  return (
    <div>
      {/* Header */}
      <Heading title="Sales" />
      <Suspense>
        <DataTable data={allSalesByRole} columns={columns} />
      </Suspense>
    </div>
  );
};

export default Page;
