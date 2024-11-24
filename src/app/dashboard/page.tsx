import React from "react";

import DashboardCharts from "./_components/charts/DashboardCharts";
import Heading from "@/components/shared/Heading";
import LargeCardGroups from "@/components/cards/LargeCardGroups";
import SmallCardGroups from "@/components/cards/SmallCardGroups";
import CustomDataTable from "@/components/tables/CustomDataTable";

const page = () => {
  return (
    <div>
      <Heading title="Dashboard Overview" />
      {/* Large Cards */}
      <LargeCardGroups />
      {/* Small Cards */}
      <SmallCardGroups />
      {/* Charts */}
      <DashboardCharts />
      {/* Recent Orders Table */}
      <CustomDataTable />
    </div>
  );
};

export default page;
