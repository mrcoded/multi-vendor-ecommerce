import React from "react";
import { User } from "next-auth";

import Heading from "@/components/shared/Heading";
import UserDashboard from "./dashboard/UserDashboard";
import DashboardCharts from "./charts/DashboardCharts";
import VendorDashboard from "./dashboard/VendorDashboard";
import OverViewCards from "@/components/cards/OverViewCards";
import LargeCardGroups from "@/components/cards/LargeCardGroups";
import SmallCardGroups from "@/components/cards/SmallCardGroups";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { classifyApiErrorFromMessage } from "@/lib/api/api-errors";

import { getAllStores } from "@/services/store-service";
import { getOrdersForUser, getAllSales } from "@/services/order-service.";
import { getAllVendors } from "@/services/vendor-service";
import { getAllProducts } from "@/services/product-service";
import { safeServerRead } from "@/lib/api/resilient-read";

function FetchError({ message }: { message?: string }) {
  return (
    <ContentUnavailable
      reason={classifyApiErrorFromMessage(message ?? "")}
      reloadOnRetry
      variant="inline"
      showHomeLink={false}
      className="min-h-[40vh]"
    />
  );
}

const Dashboard = async ({ user }: { user: User | undefined }) => {
  const role = user?.role;

  if (!user?.id) {
    return <FetchError message="Authentication required" />;
  }

  const authUser = { id: user.id, role: user.role ?? "USER" };

  const ordersPromise = safeServerRead(() => getOrdersForUser(authUser), {
    source: "dashboard:orders",
    fallback: [],
  });
  const productsPromise = safeServerRead(() => getAllProducts(), {
    source: "dashboard:products",
    fallback: [],
  });

  let stores: Awaited<ReturnType<typeof getAllStores>> = [];
  let vendors: Awaited<ReturnType<typeof getAllVendors>> = [];
  let sales: Awaited<ReturnType<typeof getAllSales>> = [];
  let orders: Awaited<ReturnType<typeof getOrdersForUser>> = [];
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];

  if (role === "USER") {
    [orders, products] = await Promise.all([ordersPromise, productsPromise]);
  } else if (role === "VENDOR") {
    [stores, orders, sales, products] = await Promise.all([
      safeServerRead(() => getAllStores(), {
        source: "dashboard:stores",
        fallback: [],
      }),
      ordersPromise,
      safeServerRead(() => getAllSales(), {
        source: "dashboard:sales",
        fallback: [],
      }),
      productsPromise,
    ]);
  } else {
    [stores, orders, vendors, sales, products] = await Promise.all([
      safeServerRead(() => getAllStores(), {
        source: "dashboard:stores",
        fallback: [],
      }),
      ordersPromise,
      safeServerRead(() => getAllVendors(), {
        source: "dashboard:vendors",
        fallback: [],
      }),
      safeServerRead(() => getAllSales(), {
        source: "dashboard:sales",
        fallback: [],
      }),
      productsPromise,
    ]);
  }

  if (role === "USER") {
    return <UserDashboard user={user} products={products} orders={orders} />;
  }

  if (user?.role === "VENDOR") {
    return (
      <VendorDashboard
        user={user}
        stores={stores}
        products={products}
        orders={orders}
        sales={sales}
        vendors={vendors}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Heading title="Dashboard Overview" />
      <LargeCardGroups sales={sales} />
      <SmallCardGroups orders={orders} />
      <OverViewCards
        role={role}
        stores={stores}
        vendors={vendors}
        products={products}
      />
      <DashboardCharts orders={orders} sales={sales} />
    </div>
  );
};

export default Dashboard;
