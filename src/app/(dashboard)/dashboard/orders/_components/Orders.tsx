"use client";

import React, { useState } from "react";
import { User } from "next-auth";
import { ShoppingBag } from "lucide-react";

import { useVendor } from "@/hooks/useVendor";
import { useOrders } from "@/hooks/useOrders";

import OrderCard from "./OrderCard";
import Paginate from "@/components/Filters/Paginate";
import AsyncContent from "@/components/feedback/AsyncContent";

const Orders = ({ user }: { user?: User | undefined }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: vendor,
    isLoading: vendorLoading,
    isError: vendorError,
    refetch: refetchVendor,
  } = useVendor(user?.role === "VENDOR" ? user?.id : undefined);
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
    refetch: refetchOrders,
  } = useOrders();

  const isLoading = ordersLoading || (user?.role === "VENDOR" && vendorLoading);
  const isError = ordersError || (user?.role === "VENDOR" && vendorError);

  const handleRetry = () => {
    if (ordersError) refetchOrders();
    if (user?.role === "VENDOR" && vendorError) refetchVendor();
  };

  return (
    <AsyncContent
      isLoading={isLoading}
      isError={isError}
      onRetry={handleRetry}
      loadingLabel="Loading orders..."
      variant="inline"
      showHomeLink={false}
    >
      <OrdersList
        user={user}
        orders={orders}
        vendorId={vendor?.id}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </AsyncContent>
  );
};

function OrdersList({
  user,
  orders,
  vendorId,
  currentPage,
  onPageChange,
}: {
  user?: User;
  orders: ReturnType<typeof useOrders>["data"];
  vendorId?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const allOrders = orders ?? [];

  const userOrders = allOrders.filter(
    (order: { userId: string }) => order.userId === user?.id,
  );

  const vendorOrders = allOrders.filter((order) =>
    order.orderItems.find(
      (item: { vendorId: string }) => item.vendorId === vendorId,
    ),
  );

  const getOrdersByRole =
    user?.role === "VENDOR"
      ? vendorOrders
      : user?.role === "USER"
        ? userOrders
        : allOrders;

  const pageSize = 9;
  const productCount = getOrdersByRole.length;
  const totalPages = Math.ceil(productCount / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = getOrdersByRole.slice(startIndex, endIndex);

  return (
    <section className="min-h-[60vh] py-2 xl:py-4">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Your Orders
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track recent and past orders, or discover more products.
          </p>
          {productCount > 0 && (
            <p className="mt-3 text-xs font-medium text-primary">
              {productCount} order{productCount !== 1 ? "s" : ""} total
            </p>
          )}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 xl:grid-cols-3">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <li className="col-span-full">
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
                <ShoppingBag className="mb-4 size-12 text-muted-foreground/40" />
                <p className="font-medium text-foreground">No orders found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Orders will appear here once placed.
                </p>
              </div>
            </li>
          )}
        </ul>

        {totalPages > 1 && (
          <div className="mt-8 border-t border-border pt-8 lg:mt-12">
            <Paginate
              totalPages={totalPages}
              productCount={productCount}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
