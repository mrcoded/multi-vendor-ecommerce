import React from "react";
import { CheckCheck, Loader, RefreshCcw, ShoppingCart } from "lucide-react";

import SmallCard from "./SmallCard";

function SmallCardGroups({ orders }: { orders: any }) {
  const status = {
    pending: "PENDING",
    processing: "PROCESSING",
    delivering: "DELIVERED",
    shipping: "SHIPPING",
    cancelling: "CANCELLED",
  };

  //function to get the count of orders
  const getOrdersCountByStatus = (status: string) => {
    return orders
      .filter((order: { orderStatus: string }) => order.orderStatus === status)
      .length.toString()
      .padStart(2, "0");
  };

  // Get the count of orders
  const totalOrdersCount = orders.length.toString().padStart(2, "0");
  const pendingOrders = getOrdersCountByStatus(status.pending);
  const shippingOrders = getOrdersCountByStatus(status.shipping);
  const processedOrders = getOrdersCountByStatus(status.processing);
  const deliveredOrders = getOrdersCountByStatus(status.delivering);
  const cancellingOrders = getOrdersCountByStatus(status.cancelling);

  const orderStatus = [
    {
      title: "Total Orders",
      number: totalOrdersCount,
      iconBg: "bg-green-600",
      icon: ShoppingCart,
    },
    {
      title: "Orders Pending",
      number: pendingOrders,
      iconBg: "bg-blue-600",
      icon: Loader,
    },
    {
      title: "Order Processing",
      number: processedOrders,
      iconBg: "bg-orange-600",
      icon: RefreshCcw,
    },
    {
      title: "Orders Delivered",
      number: deliveredOrders,
      iconBg: "bg-purple-600",
      icon: CheckCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStatus.map((data, i) => (
        <SmallCard key={i} data={data} />
      ))}
    </div>
  );
}

export default SmallCardGroups;
