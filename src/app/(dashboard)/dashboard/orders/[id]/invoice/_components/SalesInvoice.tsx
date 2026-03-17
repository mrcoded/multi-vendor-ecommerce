"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

import { SalesInvoiceProps } from "@/types/sales";
import InvoiceDownloadButton from "./InvoiceDownloadButton";

import formatDate from "@/lib/formatDate";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

function SalesInvoice({ order }: SalesInvoiceProps) {
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
    <div className="flex flex-col w-full antialiased">
      {/* ACTION BAR */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          Invoice Details
        </h1>
        <InvoiceDownloadButton onClick={handlePrint} />
      </div>

      {/* INVOICE CONTAINER */}
      <div ref={contentRef} className="w-full">
        <div className="max-w-4xl mx-auto border border-gray-200 dark:border-slate-700 p-4 sm:p-12 rounded-xl shadow-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
          {/* TOP SECTION: LOGO & SENDER */}
          <div className="flex flex-row justify-between items-start sm:gap-8 pb-10 border-b border-gray-100 dark:border-slate-800">
            <div className="space-y-2">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                className="w-24 sm:w-32 h-auto object-contain mb-4 dark:brightness-125"
                height={64}
                width={128}
                priority
              />
              <div className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                <p className="font-bold text-slate-900 dark:text-white">
                  Store Store Ltd.
                </p>
                <p>123 Shop Street, Somolu</p>
                <p>Lagos, Nigeria</p>
                <p className="text-lime-600 dark:text-lime-400 font-medium">
                  billing@shopify.com
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right sm:space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-200 dark:text-slate-800 sm:text-4xl">
                Invoice
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                #{order.orderNumber}
              </p>
              <p className="text-xs text-slate-500">
                {formatDate(invoiceDate)}
              </p>
            </div>
          </div>

          {/* MID SECTION: BILLING INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-6 sm:py-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Bill To:
              </h3>
              <div className="text-sm leading-relaxed">
                <p className="font-bold text-base text-slate-900 dark:text-white">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {order.streetAddress}, {order.city}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {order.district}, {order.country}
                </p>
                <p className="mt-2 font-medium">{order.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Payment Info:
              </h3>
              <div className="text-sm space-y-1 sm:text-right">
                <div className="flex justify-between sm:justify-end gap-8">
                  <span className="text-slate-500">Method:</span>
                  <span className="font-medium">Stripe / Card</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-8">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-lime-600">Paid</span>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-slate-800">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-2 sm:py-4 font-bold">Item</th>
                  <th className="px-6 py-2 sm:py-4 text-center font-bold">
                    Qty
                  </th>
                  <th className="px-6 py-2 sm:py-4 text-right text-nowrap font-bold">
                    Unit Price
                  </th>
                  <th className="px-6 py-2 sm:py-4 text-right font-bold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {order?.orderItems.map((item, index) => {
                  const itemSubtotal = (item.quantity * item.price).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white max-w-[200px] truncate">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-center">{item.quantity}</td>
                      <td className="px-6 py-4 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">
                        ${itemSubtotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* SUMMARY SECTION */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-10">
            <div className="flex-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Notes:
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                Free shipping for 30 days. Money-back guarantee applies to all
                original packaging items. Thank you for choosing our store!
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${subTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Sales Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-slate-800">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Total Amount
                </span>
                <span className="font-black text-xl text-lime-600">
                  ${total}
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-8 sm:mt-16 pt-4 sm:pt-8 border-t border-dotted border-gray-200 dark:border-slate-800 flex flex-col items-center gap-4">
            <Image
              src="/assets/logo.png"
              alt="Footer Logo"
              className="w-20 opacity-30 grayscale"
              height={40}
              width={80}
              priority
            />
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
              Authorized Digital Invoice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesInvoice;
