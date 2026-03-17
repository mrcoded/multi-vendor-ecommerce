import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

import { StoreProps } from "../../types";

const StoreDetails = ({ store }: { store: StoreProps }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="p-3 sm:p-5 xl:p-8 flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-8 xl:gap-10">
        {/* Store Logo/Image */}
        <div className="flex-shrink-0 flex justify-center md:block">
          <div className="">
            <Image
              src={store?.imageUrl || "/placeholder-store.png"}
              width={128}
              height={128}
              alt={store?.title}
              className="size-20 md:w-24 md:h-24 xl:w-32 xl:h-32 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-gray-700 shadow-md"
            />
          </div>
        </div>

        {/* Store Info & Description */}
        <div className="flex-grow">
          <div className="flex flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold lg:font-black text-slate-900 dark:text-white mb-1.5">
                {store?.title}
              </h1>
              <div className="flex items-center text-lime-600 dark:text-lime-400 font-bold text-xs sm:text-sm uppercase tracking-tighter">
                <MapPin className="mr-1 size-2.5 sm:size-3.5" />
                {store?.city}, {store?.country}
              </div>
            </div>

            {/* Quick Contact Action */}
            <Link
              href={`https://wa.me/${store?.storePhone?.replace(/\D/g, "")}`}
              className="sm:inline-flex items-center justify-center px-2 sm:px-5 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-all transform active:scale-95 shadow-lg shadow-green-200 dark:shadow-none"
            >
              <MessageSquare className="sm:mr-2 size-4" />
              <span className="hidden sm:flex">Chat on WhatsApp</span>
            </Link>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm lg:text-base leading-relaxed mb-3 md:mb-6 max-w-3xl line-clamp-2">
            {store?.description ||
              "High-quality products curated for the best shopping experience in Lagos. We prioritize customer satisfaction and fast delivery."}
          </p>

          {/* Detailed Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 md:pt-6 border-t border-slate-100 dark:border-gray-700">
            {/* Phone */}
            <div className="flex items-center gap-2 md:gap-3 group">
              <div className="p-2 bg-slate-100 dark:bg-gray-700 rounded-lg group-hover:bg-lime-100 dark:group-hover:bg-lime-900/30 transition-colors">
                <Phone className="size-2.5 sm:size-4 text-slate-500 dark:text-slate-400 group-hover:text-lime-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Call Us
                </p>
                <Link
                  href={`tel:${store?.storePhone}`}
                  className="text-sm font-semibold hover:text-lime-600 transition-colors"
                >
                  {store?.storePhone}
                </Link>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 md:gap-3 group">
              <div className="p-2 bg-slate-100 dark:bg-gray-700 rounded-lg group-hover:bg-lime-100 dark:group-hover:bg-lime-900/30 transition-colors">
                <Mail className="size-2.5 sm:size-4 text-slate-500 dark:text-slate-400 group-hover:text-lime-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Email Address
                </p>
                <a
                  href={`mailto:${store?.storeEmail}`}
                  className="text-sm font-semibold hover:text-lime-600 transition-colors truncate block max-w-[180px]"
                >
                  {store?.storeEmail}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 md:gap-3 group">
              <div className="p-2 bg-slate-100 dark:bg-gray-700 rounded-lg group-hover:bg-lime-100 dark:group-hover:bg-lime-900/30 transition-colors">
                <MapPin className="size-2.5 sm:size-4 text-slate-500 dark:text-slate-400 group-hover:text-lime-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Store Location
                </p>
                <p className="text-xs sm:text-sm font-semibold line-clamp-1">
                  {store?.streetAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
