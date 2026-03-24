import React from "react";
import { User } from "next-auth";

import Heading from "@/components/shared/Heading";
import UserDashboard from "./dashboard/UserDashboard";
import DashboardCharts from "./charts/DashboardCharts";
import VendorDashboard from "./dashboard/VendorDashboard";
import OverViewCards from "@/components/cards/OverViewCards";
import LargeCardGroups from "@/components/cards/LargeCardGroups";
import SmallCardGroups from "@/components/cards/SmallCardGroups";

import { fetchAllStoresAction } from "@/lib/actions/store-actions";
import {
  fetchAllOrdersAction,
  fetchAllSalesAction,
} from "@/lib/actions/order-actions";
import { fetchAllVendorsAction } from "@/lib/actions/vendor-actions";
import { fetchAllProductsAction } from "@/lib/actions/product-actions";

const Dashboard = async ({ user }: { user: User | undefined }) => {
  const role = user?.role;
  const { data: stores } = await fetchAllStoresAction();
  const { data: orders } = await fetchAllOrdersAction();
  const { data: vendors } = await fetchAllVendorsAction();
  const { data: sales } = await fetchAllSalesAction();
  const { data: products } = await fetchAllProductsAction();

  const allOrders = orders?.data;
  const allVendors = vendors?.data;
  const storeDatas = stores ?? [];
  const allSales = sales?.data;

  //Set User and Vendor Dashboard
  if (role === "USER")
    return <UserDashboard user={user} products={products} orders={allOrders} />;
  if (role === "VENDOR") {
    <VendorDashboard
      user={user}
      stores={storeDatas}
      products={products}
      orders={allOrders}
      sales={allSales}
    />;
  }

  return (
    <div>
      <Heading title="Dashboard Overview" />

      {/* Large Cards */}
      <LargeCardGroups sales={allSales} />

      {/* Small Cards */}
      <SmallCardGroups orders={allOrders} />

      {/* OverViewCards Cards */}
      <OverViewCards stores={stores} vendors={allVendors} products={products} />

      {/* Charts */}
      <DashboardCharts orders={allOrders} sales={allSales} />
      {/* Recent Orders Table */}
      {/* <CustomDataTable /> */}
    </div>
  );
};

export default Dashboard;
