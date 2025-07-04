import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";

import getData from "@/lib/getData";

import HeroCarousel from "./carousels/HeroCarousel";
import CategorySidebar from "@/app/(other-pages)/category/_components/CategorySidebar";

async function HeroPage() {
  const banners = await getData("banners");

  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
      <CategorySidebar />

      <div className="col-span-full sm:col-span-7 bg-blue-600 rounded-md">
        <HeroCarousel banners={banners} />
      </div>

      <div className="col-span-2 hidden sm:block bg-white p-3 dark:bg-slate-800 rounded-lg">
        <Link href="#" className="flex items-center space-x-1 mb-3">
          <HelpCircle className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Help Center</h2>
            <p className="text-[0.6rem]">Guide to Customer Care</p>
          </div>
        </Link>

        <Link href="#" className="flex items-center space-x-1 mb-3">
          <FolderSync className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Easy Return</h2>
            <p className="text-[0.6rem]">Quick Return</p>
          </div>
        </Link>

        <Link
          href="/register/vendors"
          className="flex items-center space-x-1 mb-6"
        >
          <CircleDollarSign className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Sell on MVE</h2>
            <p className="text-[0.6rem]">Million of Visitors</p>
          </div>
        </Link>

        <Image
          src="/assets/ads.gif"
          width={556}
          height={556}
          alt="hero"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default HeroPage;
