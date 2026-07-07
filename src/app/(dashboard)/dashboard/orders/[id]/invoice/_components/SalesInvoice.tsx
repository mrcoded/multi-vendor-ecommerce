"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { ArrowLeft } from "lucide-react";

import { SalesInvoiceProps } from "@/types/sales";
import InvoiceDownloadButton from "./InvoiceDownloadButton";

import formatDate from "@/lib/formatDate";
import generateISOFormatDate from "@/lib/generateISOFormatDate";
import { Button } from "@/components/ui/button";

function SalesInvoice({ order }: { order?: SalesInvoiceProps["order"] }) {
  if (!order) return <>Loading...</>;

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Invoice_${order.orderNumber}`,
  });

  const invoiceDate = generateISOFormatDate(order.createdAt);
  const subTotalNum = order.orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const subTotal = subTotalNum.toFixed(2);
  const tax = 20.0;
  const total = (subTotalNum + tax).toFixed(2);

  return (
    <div className="flex w-full flex-col antialiased">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard/orders" aria-label="Back to orders">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground sm:text-xl">
              Invoice #{order.orderNumber}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatDate(invoiceDate)}
            </p>
          </div>
        </div>
        <InvoiceDownloadButton onClick={handlePrint} />
      </div>

      <div ref={contentRef} className="w-full">
        <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-4 text-foreground shadow-sm transition-colors sm:p-12">
          <div className="flex flex-row items-start justify-between border-b border-border pb-10 sm:gap-8">
            <div className="space-y-2">
              <Image
                src="/assets/icon.png"
                alt="Logo"
                className="mb-4 h-auto w-24 object-contain sm:w-32 dark:brightness-125"
                height={64}
                width={128}
                priority
              />
              <div className="text-sm leading-relaxed text-muted-foreground">
                <p className="font-bold text-foreground">
                  Belstore Multi Vendor.
                </p>
                <p>123 Shop Street, Somolu</p>
                <p>Lagos, Nigeria</p>
                <p className="font-medium text-primary">billing@shopify.com</p>
              </div>
            </div>

            <div className="space-y-1 text-left sm:text-right">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-muted sm:text-4xl">
                Invoice
              </h2>
              <p className="text-xs font-bold text-foreground sm:text-sm">
                #{order.orderNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(invoiceDate)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 py-6 sm:grid-cols-2 sm:py-10">
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Bill To:
              </h3>
              <div className="text-sm leading-relaxed">
                <p className="text-base font-bold text-foreground">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-muted-foreground">
                  {order.streetAddress}, {order.city}
                </p>
                <p className="text-muted-foreground">
                  {order.district}, {order.country}
                </p>
                <p className="mt-2 font-medium">{order.emailAddress}</p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Payment Info:
              </h3>
              <div className="space-y-1 text-sm sm:text-right">
                <div className="flex justify-between gap-8 sm:justify-end">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium">Stripe / Card</span>
                </div>
                <div className="flex justify-between gap-8 sm:justify-end">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-bold text-primary">Paid</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-2 font-bold sm:py-4">Item</th>
                  <th className="px-6 py-2 text-center font-bold sm:py-4">
                    Qty
                  </th>
                  <th className="px-6 py-2 text-right font-bold text-nowrap sm:py-4">
                    Unit Price
                  </th>
                  <th className="px-6 py-2 text-right font-bold sm:py-4">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {order?.orderItems.map((item, index) => {
                  const itemSubtotal = (item.quantity * item.price).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <td className="max-w-[200px] truncate px-6 py-4 font-semibold text-foreground">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-center">{item.quantity}</td>
                      <td className="px-6 py-4 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-foreground">
                        ${itemSubtotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-10 sm:flex-row">
            <div className="flex-1">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Notes:
              </h3>
              <p className="text-xs italic leading-relaxed text-muted-foreground">
                Free shipping for 30 days. Money-back guarantee applies to all
                original packaging items. Thank you for choosing our store!
              </p>
            </div>

            <div className="w-full space-y-3 sm:w-64">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sales Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-base font-bold text-foreground">
                  Total Amount
                </span>
                <span className="text-xl font-black text-primary">
                  ${total}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-dotted border-border pt-4 sm:mt-16 sm:pt-8">
            <Image
              src="/assets/icon.png"
              alt="Footer Logo"
              className="h-10 w-20 opacity-30 grayscale"
              height={40}
              width={80}
              priority
            />
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Authorized Digital Invoice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesInvoice;
