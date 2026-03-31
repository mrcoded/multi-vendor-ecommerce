import React from "react";

import { User } from "next-auth";

import { Info } from "lucide-react";
import Heading from "@/components/shared/Heading";
import LargeCardGroups from "@/components/cards/LargeCardGroups";
import SmallCardGroups from "@/components/cards/SmallCardGroups";
import DashboardCharts from "../charts/DashboardCharts";
import { ProductFormData } from "@/types/products";
import { OrderCardProps } from "@/types/order";

async function UserDashboard({
  user,
  orders,
  products,
}: {
  user: User | undefined;
  products: ProductFormData[] | undefined;
  orders: OrderCardProps[];
}) {
  const userId = user?.id;

  //filter all user orders
  const userOrders = orders?.filter(
    (order: { userId: string }) => order?.userId === userId,
  );

  //filter user products
  const productsById = products?.filter(
    (product: { userId: string }) => product.userId === userId,
  );

  return (
    <div>
      <Heading title="My Dashboard Overview" />

      {/* Large Cards */}
      {/* <LargeCardGroups sales={salesById} /> */}

      {/* Small Cards */}
      <SmallCardGroups orders={userOrders} />
    </div>
  );
}

export default UserDashboard;
