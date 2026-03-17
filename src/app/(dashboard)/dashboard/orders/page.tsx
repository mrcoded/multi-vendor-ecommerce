import React from "react";
import { getServerSession } from "next-auth";

import getData from "@/lib/getData";
import { authOptions } from "@/lib/authOptions";

import OrderCard from "./_components/OrderCard";
import Paginate from "@/components/Filters/Paginate";
import { OrderCardProps } from "@/types/order";

async function OrdersPage() {
  //Fetch all orders
  const orders: OrderCardProps[] = await getData("orders");
  //Get the userId
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session?.user?.id;
  const role = session?.user?.role;

  //Filter by userId
  const userOrders = orders?.filter(
    (order: { userId: string }) => order.userId === userId,
  );

  //Filter by vendorId
  const vendorOrders = orders?.filter(
    (order: { orderItems: Array<{ vendorId: string }> }) =>
      order.orderItems.filter((item: { vendorId: string }) => {
        console.log(item.vendorId, userId);
        return item.vendorId === userId;
      }),
  );
  // console.log(userOrders, vendorOrders, orders);
  //PAGINATION
  const pageSize = 10;
  const productCount = orders?.length;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <section className="lg:py-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="">
            <h1 className="text-2xl font-bold dark:text-muted-foreground text-gray-900 sm:text-3xl">
              Your Orders
            </h1>
            <p className="mt-2 text-sm font-normal dark:text-muted-foreground text-gray-600">
              Check the status of recent and old orders & discover more products
            </p>
          </div>
        </div>

        {/* Orders List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-8 lg:mt-12 ">
          {role === "USER" ? (
            userOrders?.length > 0 ? (
              userOrders.map((order, i) => <OrderCard key={i} order={order} />)
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No orders found.</p>
              </div>
            )
          ) : role === "VENDOR" ? (
            vendorOrders?.length > 0 ? (
              vendorOrders.map((order, i) => (
                <OrderCard key={i} order={order} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No orders found.</p>
              </div>
            )
          ) : role === "ADMIN" ? (
            orders?.length > 0 ? (
              orders.map((order, i) => <OrderCard key={i} order={order} />)
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No orders found.</p>
              </div>
            )
          ) : (
            <></>
          )}
        </ul>

        {/* Pagination Section */}
        <div className="mt-5 xl:mt-12 flex justify-center">
          <Paginate totalPages={totalPages} productCount={productCount} />
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;
