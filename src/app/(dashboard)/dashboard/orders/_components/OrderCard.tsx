"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { OrderStatus } from "@prisma/client";
import { FileText, ExternalLink, Package } from "lucide-react";

import formatDate from "@/lib/formatDate";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import generateISOFormatDate from "@/lib/generateISOFormatDate";
import { cn } from "@/lib/utils";

import { OrderCardProps } from "@/types/order";
import { STATUS_OPTIONS } from "@/constants/order-status";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderStatusManager } from "@/components/OrderStatusManager";
import { ConfirmModal } from "@/components/modals/ConfirmationModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const OrderCard = ({ order }: { order: OrderCardProps }) => {
  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order?.orderStatus as OrderStatus,
  );

  const orderCreationDate = generateISOFormatDate(order?.createdAt);

  const subTotal = order?.orderItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const itemCount = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  if (!order.orderStatus || order.orderStatus.length === 0) {
    return null;
  }

  const onStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus({ id: order?.id, status: newStatus });
    setOpen(false);
  };

  const handleStatusChange = (status: OrderStatus) => {
    if (status === "CANCELLED") {
      setSelectedStatus(status);
      setOpen(true);
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

      <li>
        <Card
          className={cn(
            "flex h-full min-h-[220px] flex-col overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:min-h-[200px]",
          )}
        >
          <CardHeader className="space-y-0 border-b border-border bg-muted/30 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold text-foreground">
                    #{order.orderNumber}
                  </p>
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Package className="size-3" />
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(orderCreationDate)}
                </p>
              </div>

              <OrderStatusManager
                currentStatus={order.orderStatus}
                options={STATUS_OPTIONS}
                onStatusChange={(status: OrderStatus) =>
                  handleStatusChange(status)
                }
                isUpdating={isPending}
              />
            </div>
          </CardHeader>

          <CardContent className="custom-scrollbar flex-1 space-y-0 p-0">
            <ul className="divide-y divide-border">
              {order.orderItems.map((item) => (
                <li
                  key={item.id ?? item.title}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30"
                >
                  <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border sm:size-14">
                    <Image
                      className="size-full object-cover"
                      height={56}
                      width={56}
                      src={item.imageUrl}
                      alt={item.title}
                      unoptimized
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <span>Qty {item.quantity}</span>
                      <span>${item.price.toFixed(2)} each</span>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>

          <div className="flex flex-col gap-3 border-t border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Order total
              </p>
              <p className="text-lg font-bold text-foreground">${subTotal}</p>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 sm:flex-none"
              >
                <Link href={`/dashboard/orders/${order.id}/invoice`}>
                  <FileText className="size-4" />
                  Invoice
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                asChild
                className="flex-1 sm:flex-none"
              >
                <Link href={`/order-confirmation/${order.id}`}>
                  <ExternalLink className="size-4" />
                  View
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </li>
    </>
  );
};

export default OrderCard;
