import React from "react";

import getData from "@/lib/getData";
import OrderCard from "./_components/OrderCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const page = async () => {
  //Fetch all orders
  const orders = await getData("orders");
  //Get the userId
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session?.user?.id;

  if (orders.length === 0 || !orders) {
    return <p>No Order Yet</p>;
  }
  //Filter by userId
  const userOrders = orders.filter((order: any) => order.userId === userId);

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Orders
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-600">
              Check the status of recent and old orders & discover more products
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {userOrders.map((order: any, i: number) => {
              return <OrderCard key={i} order={order} />;
            })}{" "}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default page;
