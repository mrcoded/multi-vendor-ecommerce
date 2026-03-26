"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { OrderStatus } from "@prisma/client";

import formatDate from "@/lib/formatDate";
import { generateSlug } from "@/lib/generateSlug";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

import { OrderCardProps } from "@/types/order";
import { STATUS_OPTIONS } from "@/constants/order-status";

import { OrderStatusManager } from "@/components/OrderStatusManager";
import { ConfirmModal } from "@/components/modals/ConfirmationModal";

const OrderCard = ({ order }: { order: OrderCardProps }) => {
  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();

  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order?.orderStatus as OrderStatus,
  );

  // Generate ISO Date
  const orderCreationDate = generateISOFormatDate(order?.createdAt);

  // Calculate Subtotal
  const subTotal = order?.orderItems
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  if (!order.orderStatus || order.orderStatus.length === 0) {
    return null;
  }

  // onStatusChange handler function
  const onStatusChange = (newStatus: OrderStatus) => {
    // setLoading(true);
    updateOrderStatus({ id: order?.id, status: newStatus });
    setOpen(false);
  };

  // handleStatusChange
  const handleStatusChange = (status: OrderStatus) => {
    if (status === "CANCELLED") {
      setSelectedStatus(status);
      setOpen(true); // Open modal for confirmation
    } else {
      onStatusChange(status);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onStatusChange(selectedStatus)}
        loading={isPending}
      />

      <li className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm transition-all hover:border-gray-300 h-[220px] sm:h-[200px]">
        {/* TOP BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 xl:px-5 bg-gray-50/80 border-b border-gray-100 shrink-0">
          <div className="flex gap-4 md:gap-6 text-xs sm:text-sm">
            <div>
              <p className="font-medium text-gray-500 uppercase tracking-tight">
                Order ID
              </p>
              <p className="font-bold text-gray-900">#{order.orderNumber}</p>
            </div>
            <div className="hidden xs:block">
              <p className="font-medium text-gray-500 uppercase tracking-tight">
                Date
              </p>
              <p className="font-bold text-gray-900">
                {formatDate(orderCreationDate)}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-500 uppercase tracking-tight">
                Total
              </p>
              <p className="font-bold text-gray-900">${subTotal}</p>
            </div>
          </div>

          <div>
            <OrderStatusManager
              currentStatus={order.orderStatus}
              options={STATUS_OPTIONS}
              onStatusChange={(status: OrderStatus) =>
                handleStatusChange(status)
              }
              isUpdating={isPending}
            />
          </div>
        </div>

        {/* SCROLLABLE ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <ul className="divide-y divide-gray-100">
            {order.orderItems.map((item, i) => (
              <li key={i} className="py-2 md:py-3 first:pt-0 last:pb-0">
                <div className="flex group">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14">
                    <Image
                      className="object-cover rounded-md border border-gray-100"
                      height={64}
                      width={64}
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </div>

                  <div className="flex-1 min-w-0 ml-2 md:ml-4 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-3">
                      <p className="text-xs text-gray-500 mt-0.5">
                        Qty: {item.quantity}
                      </p>
                      <p className="mt-0.5">
                        <span className="text-xs text-gray-500">Unit:</span>{" "}
                        <span className="text-xs font-bold text-gray-700">
                          ${item.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER ACTIONS*/}
        <div className="py-2 px-4 xl:p-4 bg-white border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
          <Link
            href={`/dashboard/orders/${order.id}/invoice`}
            className="px-2.5 xl:px-4 py-1.5 xl:py-2 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Invoice
          </Link>
          <Link
            href={`/products/${generateSlug(slug)}`}
            // href={`/dashboard/orders/${order.id}`} // Link to the order detail page
            className="px-2.5 xl:px-4 py-1.5 xl:py-2 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Order
          </Link>
        </div>
      </li>
    </>
  );
};

export default OrderCard;
