"use client";

import React from "react";
import { User } from "next-auth";
import { useSearchParams } from "next/navigation";

import { useVendor } from "@/hooks/useVendor";
import { useOrders } from "@/hooks/useOrders";

import OrderCard from "./OrderCard";
import Paginate from "@/components/Filters/Paginate";

const Orders = ({ user }: { user?: User | undefined }) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const vendorData = useVendor(user?.id);
  const { data: orders } = useOrders();

  if (!orders) return <div>Loading...</div>;

  const vendorId = vendorData?.data?.id;

  const allOrders = orders?.data ?? [];

  //Filter by userId
  const userOrders = allOrders.filter(
    (order: { userId: string }) => order.userId === user?.id,
  );

  //Filter by vendorId
  const vendorOrders = allOrders.filter((order) =>
    order.orderItems.find(
      (item: { vendorId: string }) => item.vendorId === vendorId,
    ),
  );

  // Filter by Role (User vs Vendor)
  const getOrdersByRole =
    user?.role === "VENDOR"
      ? vendorOrders
      : user?.role === "USER"
        ? userOrders
        : allOrders;

  //PAGINATION LOGIC
  const pageSize = 9;
  const productCount = getOrdersByRole.length; // Use filtered count, not allOrders
  const totalPages = Math.ceil(productCount / pageSize);

  // Slice the array
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = getOrdersByRole.slice(startIndex, endIndex);

  return (
    <section className="xl:py-4 min-h-screen">
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
          {currentOrders?.length > 0 ? (
            currentOrders.map((order, i) => <OrderCard key={i} order={order} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No orders found.</p>
            </div>
          )}
        </ul>

        {/* Pagination Section */}
        <div className="mt-5 xl:mt-12 flex justify-center">
          <Paginate totalPages={totalPages} productCount={productCount} />
        </div>
      </div>
    </section>
  );
};

export default Orders;
