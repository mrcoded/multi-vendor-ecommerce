"use client";

import React, { Suspense } from "react";
import { Info } from "lucide-react";

import { useVendor } from "@/hooks/useVendor";

import { DashboardProps } from "@/types/dashboard";

import Loading from "@/app/loading";
import Heading from "@/components/shared/Heading";
import DashboardCharts from "../charts/DashboardCharts";
import OverViewCards from "@/components/cards/OverViewCards";
import SmallCardGroups from "@/components/cards/SmallCardGroups";
import LargeCardGroups from "@/components/cards/LargeCardGroups";

function VendorDashboard({
  user,
  stores,
  orders,
  sales,
  products,
  vendors,
}: DashboardProps) {
  const userId = user?.id;
  const role = user?.role;
  const vendor = useVendor(userId);
  //check if user is a vendor
  const vendorId = vendor?.data?.id;

  //Fetch all the vendor orders
  const vendorOrders = orders?.filter((order) =>
    order.orderItems.find(
      (item: { vendorId: string }) => item.vendorId === vendorId,
    ),
  );

  //Fetch all the vendor stores
  const vendorStores = stores?.filter((store) => store.vendorId === vendorId);

  //filter all the sales
  const salesById = sales?.filter(
    (sale: { vendorId: string }) => sale.vendorId === userId,
  );

  //filter the vendor products
  const productsById = products?.filter(
    (product: { userId: string }) => product.userId === userId,
  );

  if (!user?.status) {
    return (
      <div className="max-w-2xl mx-auto min-h-screen mt-8">
        <div
          role="alert"
          id="alert-additional-content-1"
          className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        >
          <div className="flex items-center">
            <Info className="flex shrink-0 size-4 me-2" />
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Account Under Review</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Your account details are currently under review. Please note that it
            may take 24-48 hours for approval. Thank you for your patience.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[85rem] py-4 sm:px-6 xl:py-10 mx-auto">
      <Heading title="Vendor Dashboard Overview" />
      <Suspense fallback={<Loading />}>
        {/* Large Cards */}
        <LargeCardGroups sales={salesById} />

        {/* Small Cards */}
        <SmallCardGroups orders={vendorOrders} />
        {/* Overview Cards */}
        <OverViewCards
          role={role}
          vendorId={vendorId}
          products={productsById}
          stores={vendorStores}
          sales={salesById}
          vendors={vendors}
        />
        {/* Charts */}
        <DashboardCharts orders={vendorOrders} sales={salesById} />
        {/* Recent Orders Table */}
        {/* <CustomDataTable /> */}
      </Suspense>
    </div>
  );
}

export default VendorDashboard;
