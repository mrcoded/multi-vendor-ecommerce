import React from "react";
import { CheckCheck, Loader, RefreshCcw, ShoppingCart } from "lucide-react";

import SmallCard from "./SmallCard";

function SmallCardGroups() {
  const orderStatus = [
    {
      title: "Total Orders",
      number: 500,
      iconBg: "bg-green-600",
      icon: ShoppingCart,
    },
    {
      title: "Orders Pending",
      number: 100,
      iconBg: "bg-blue-600",
      icon: Loader,
    },
    {
      title: "Order Processing",
      number: 200,
      iconBg: "bg-orange-600",
      icon: RefreshCcw,
    },
    {
      title: "Orders Delivered",
      number: 300,
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
