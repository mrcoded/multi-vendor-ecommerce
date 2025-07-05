import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import getData from "@/lib/getData";

import Heading from "@/components/shared/Heading";
import UserDashboard from "./_components/dashboard/UserDashboard";
import VendorDashboard from "./_components/dashboard/VendorDashboard";
import LargeCardGroups from "@/components/cards/LargeCardGroups";
import SmallCardGroups from "@/components/cards/SmallCardGroups";
import DashboardCharts from "./_components/charts/DashboardCharts";

const page = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const orders = await getData("orders");
  const sales = await getData("orders/sales");

  //Set User and Vendor Dashboard
  if (role === "USER") return <UserDashboard />;
  if (role === "VENDOR") return <VendorDashboard />;

  return (
    <div>
      <Heading title="Dashboard Overview" />
      {/* Large Cards */}
      <LargeCardGroups sales={sales} />
      {/* Small Cards */}
      <SmallCardGroups orders={orders} />
      {/* Charts */}
      <DashboardCharts />
      {/* Recent Orders Table */}
      {/* <CustomDataTable /> */}
    </div>
  );
};

export default page;
