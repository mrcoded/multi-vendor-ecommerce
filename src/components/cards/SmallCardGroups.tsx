import React from "react";
import { CheckCheck, Clock, RefreshCcw, ShoppingCart } from "lucide-react";

import { OrderCardProps } from "@/types/order";

import SmallCard from "./SmallCard";

const ORDER_STATUS = {
  pending: "PENDING",
  processing: "PROCESSING",
  delivered: "DELIVERED",
} as const;

function SmallCardGroups({ orders }: { orders: OrderCardProps[] }) {
  const getOrdersCountByStatus = (status: string) =>
    orders.filter((order) => order.orderStatus === status).length;

  const orderStatus = [
    {
      title: "Total Orders",
      number: String(orders.length),
      icon: ShoppingCart,
      variant: "primary" as const,
    },
    {
      title: "Pending",
      number: String(getOrdersCountByStatus(ORDER_STATUS.pending)),
      icon: Clock,
      variant: "secondary" as const,
    },
    {
      title: "Processing",
      number: String(getOrdersCountByStatus(ORDER_STATUS.processing)),
      icon: RefreshCcw,
      variant: "accent" as const,
    },
    {
      title: "Delivered",
      number: String(getOrdersCountByStatus(ORDER_STATUS.delivered)),
      icon: CheckCheck,
      variant: "muted" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {orderStatus.map((data) => (
        <SmallCard key={data.title} data={data} />
      ))}
    </div>
  );
}

export default SmallCardGroups;
