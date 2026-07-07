import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";

import CategorySidebar from "@/app/(other-pages)/category/_components/CategorySidebar";
import { getAllBanners } from "@/services/banner-service";
import { serverRead } from "@/lib/api/resilient-read";

import HeroCarousel from "./carousels/HeroCarousel";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import HeroSectionSkeleton from "@/components/feedback/skeletons/HeroSectionSkeleton";

import { CategoryProps } from "@/types/category";

async function HeroSection({ categories }: { categories: CategoryProps[] }) {
  const banners = await serverRead(() => getAllBanners(), {
    source: "home:banners",
  });

  return (
    <ErrorBoundary variant="inline" showHomeLink={false} showToast>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <div className="mb-3 grid grid-cols-12 gap-3 lg:mb-6 lg:gap-5 xl:gap-8">
          <CategorySidebar categories={categories} />

          <div className="col-span-full overflow-hidden rounded-lg bg-secondary sm:col-span-8 lg:col-span-7">
            <HeroCarousel banners={banners} />
          </div>

          <div className="hidden rounded-lg bg-card p-3 lg:col-span-2 lg:block">
            <Link href="#" className="mb-3 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col">
                <h2 className="text-sm uppercase text-foreground">
                  Help Center
                </h2>
                <p className="text-[0.6rem] text-muted-foreground">
                  Guide to Customer Care
                </p>
              </div>
            </Link>

            <Link href="#" className="mb-3 flex items-center gap-2">
              <FolderSync className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col">
                <h2 className="text-sm uppercase text-foreground">
                  Easy Return
                </h2>
                <p className="text-[0.6rem] text-muted-foreground">
                  Quick Return
                </p>
              </div>
            </Link>

            <Link
              href="/register/vendor"
              className="mb-6 flex items-center gap-2"
            >
              <CircleDollarSign className="h-5 w-5 shrink-0 text-accent" />
              <div className="flex flex-col">
                <h2 className="text-sm uppercase text-foreground">
                  Sell on Belstore
                </h2>
                <p className="text-[0.6rem] text-muted-foreground">
                  Million of Visitors
                </p>
              </div>
            </Link>

            <Image
              src="/assets/deals.gif"
              width={256}
              height={256}
              alt="Promotional banner"
              priority
              unoptimized
              sizes="(max-width: 1280px) 0px, 200px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default HeroSection;
