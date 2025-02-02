"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

import InvoiceDownloadButton from "./InvoiceDownloadButton";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

type SalesInvoiceProps = {
  order: {
    id: string;
    orderItems: Array<any>;
    orderNumber: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    streetAddress: string;
    city: string;
    district: string;
    country: string;
  };
};

function SalesInvoice({ order }: SalesInvoiceProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `invoice${order.id}`,
  });

  const invoiceDate = generateISOFormatDate(order.createdAt);

  const subTotal =
    order.orderItems
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2) ?? 0;

  const tax = 20;

  const total = parseFloat(subTotal + tax).toFixed(2);

  return (
    <div className="flex flex-col">
      {/* DOWNLOAD BUTTON */}
      <div className="flex items-end justify-end mb-8">
        <InvoiceDownloadButton onClick={handlePrint} />
      </div>

      {/* INVOICE */}
      <div ref={contentRef}>
        <div className="max-w-4xl mx-auto border border-gray-500 p-8 rounded-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800">
          {/* Header */}
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col">
              <h2>Bill From:</h2>
              <p>Shopify Hardware Store</p>
              <p>Shop Street</p>
              <p>Nigeria</p>
              <p>Shopify@gmail.com</p>
            </div>

            <img src="/logo" alt="MVE logo" className="w-32 h-16" />
          </div>

          {/* Header End */}
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col">
              <h2>Bill To:</h2>
              <p>
                {order.firstName} {order.lastName}
              </p>
              <p>
                {order.streetAddress} {order.city} {order.district}
              </p>
              <p>{order.country}</p>
              <p>{order.email}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Invoice #</p>
                <p>{order.orderNumber}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Invoice Date</p>
                <p>{invoiceDate}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Amount Due</p>
                <p>${subTotal}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gry-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Cost
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.orderItems.map(
                  (
                    item: { title: string; quantity: number; price: number },
                    index: number
                  ) => {
                    const itemSubtotal = (item.quantity * item.price).toFixed(
                      2
                    );

                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.title}
                        </th>
                        <td className="px-6 py-4">Silver</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">${item.price}</td>
                        <td className="px-6 py-4">${itemSubtotal}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>NOTES</h2>
              <p>Free Shipping for 30 Days Money back guarantee</p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between gap-4">
                <p>SubTotal</p>
                <p>${subTotal}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>${tax}</p>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <p>${total}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center pt-8">
            <img src="/logo" alt="MVE logo" className="w-32 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesInvoice;
