import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import getData from "@/lib/getData";

interface OrderItemProps {
  id: string;
  imageUrl: string;
  qty: number;
  price: number;
  title: string;
}

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const order = await getData(`/orders/${id}`);
  const { orderItems } = order;

  const subTotal = orderItems
    ?.reduce((total: number, item: { price: number; quantity: number }) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          <div className="relative mt-6 overflow-hidden bg-white rounded-lg shadow md:mt-10">
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-3 text-xs font-bold text-gray-900 transition-all duration-200 dark:bg-slate-50 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View invoice
              </button>
            </div>

            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="-my-8 divide-y divide-gray-200">
                <div className="pt-16 pb-8 text-center sm:py-8">
                  <CheckCircle2 className="size-10 mx-auto text-green-500" />
                  <h1 className="mt-4 text-2xl font-bold text-gray-900">
                    We received your order!
                  </h1>
                  <p className="mt-2 text-sm font-normal text-gray-600">
                    Your order #{order.orderNumber} is completed and ready to
                    ship
                  </p>
                </div>

                <div className="py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-20">
                    <div>
                      <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        Shipping Address
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="mt-3 text-sm font-medium text-gray-600">
                        {order.streetAddress} {order.city}, {order.district},{" "}
                        {order.country}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        Payment Info
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600">
                        {order.paymentMethod}
                      </p>
                      {/* <p className="mt-3 text-sm font-medium text-gray-600">
                        {order.streetAddress} {order.city}, {order.district},{" "}
                        {order.country}
                      </p> */}
                    </div>
                  </div>
                </div>

                <div className="py-8">
                  <div className="grid grid-cols-1 gap-y-8 sm:gap-x-20">
                    <div>
                      <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        Order Items
                      </h2>

                      <div className="flow-root mt-8">
                        <ul className="divide-y divide-gray-200 -my-7">
                          {orderItems.length > 0 &&
                            orderItems.map(
                              (item: OrderItemProps, i: number) => (
                                <li
                                  key={i}
                                  className="flex items-start justify-between space-x-5 py-7 md:items-stretch"
                                >
                                  <div className="flex items-stretch">
                                    <div className="flex-shrink-0">
                                      <Image
                                        src={item.imageUrl}
                                        height={200}
                                        width={200}
                                        alt={item.title}
                                        className="object-cover size-20 rounded-lg"
                                      />
                                      <div>
                                        <h2>{item.title}</h2>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="ml-auto">
                                    <p className="text-sm font-bold text-right text-gray-900">
                                      {item.price}
                                    </p>
                                  </div>
                                </li>
                              )
                            )}
                        </ul>

                        <div className="py-8">
                          <ul className="space-y-4">
                            <li className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-600">
                                Sub total
                              </p>
                              <p className="text-sm font-medium text-gray-600">
                                {subTotal}
                              </p>
                            </li>

                            <li className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                Total
                              </p>
                              <p className="text-sm font-bold text-gray-900">
                                {subTotal}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
