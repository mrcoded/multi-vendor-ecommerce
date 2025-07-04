"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

import {
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  HeartHandshake,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  ScanSearch,
  SendToBack,
  Slack,
  Truck,
  User,
  Users2,
  UserSquare2,
  Warehouse,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const role = session?.user?.role;

  if (role === "VENDOR") {
    sidebarLinks = [
      {
        title: "Sales",
        icon: Truck,
        href: "/dashboard/sales",
      },
      {
        title: "Wallet",
        icon: CircleDollarSign,
        href: "/dashboard/wallet",
      },
      {
        title: "Vendor Support",
        icon: HeartHandshake,
        href: "/dashboard/vendor-support",
      },
      {
        title: "Settings",
        icon: LayoutGrid,
        href: "/dashboard/settings",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];
    catalogueLinks = [
      {
        title: "Products",
        icon: Boxes,
        href: "/dashboard/products",
      },
      {
        title: "Coupons",
        icon: ScanSearch,
        href: "/dashboard/coupons",
      },
    ];
  }

  if (role === "USER") {
    catalogueLinks = [];
    sidebarLinks = [
      {
        title: "My Orders",
        icon: Truck,
        href: "/dashboard/orders",
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/profile",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];
  }

  async function handleLogout() {
    await signOut({ callbackUrl: "/" });
    // router.push("/");
  }

  return (
    <div
      className={cn(
        "dark:bg-slate-800 bg-white space-y-6 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll",
        showSidebar
          ? "sm:block mt-20 sm:mt-0 z-10"
          : "mt-20 sm:mt-0 hidden lg:block"
      )}
    >
      <Link
        className="py-4 px-6"
        href="/dashboard"
        onClick={() => setShowSidebar(true)}
      >
        <Image
          src="/assets/userprofile.png"
          alt="logo"
          width={100}
          height={18}
          className="w-36"
        />
      </Link>
      <div className="space-y-3 flex flex-col mt-14 max-h-screen">
        <Link
          href="/dashboard"
          onClick={() => setShowSidebar(false)}
          className={cn(
            "flex items-center space-x-3 px-6 py-2",
            pathname === "/dashboard" &&
              "border-l-8 border-lime-500 text-lime-500"
          )}
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>

        {catalogueLinks.length > 0 && (
          <Collapsible className="px-6 py-2">
            <CollapsibleTrigger onClick={() => setOpenMenu(!openMenu)} asChild>
              <button className="flex items-center space-x-6 py-2">
                <div className="flex items-center space-x-3">
                  <Slack />
                  <span>Catalogue</span>
                </div>

                {openMenu ? <ChevronDown /> : <ChevronRight />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-lg py-3 px-3 pl-6 dark:bg-slate-800 dark:text-slate-300 ">
              {catalogueLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => setShowSidebar(false)}
                  className={cn(
                    "flex items-center space-x-3 py-1 text-sm",
                    link.href == pathname && " text-lime-500"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.title}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {sidebarLinks.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            onClick={() => setShowSidebar(false)}
            className={cn(
              "flex items-center space-x-3 px-6 py-2",
              link.href == pathname &&
                "border-l-8 border-lime-500 text-lime-500"
            )}
          >
            <link.icon />
            <span>{link.title}</span>
          </Link>
        ))}

        <div className="px-6 py-2">
          <button
            onClick={handleLogout}
            className="bg-lime-600 rounded-md flex items-center space-x-3 py-3 px-6"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

let sidebarLinks = [
  {
    title: "Customers",
    icon: Users2,
    href: "/dashboard/customers",
  },
  {
    title: "Stores",
    icon: Warehouse,
    href: "/dashboard/stores",
  },
  {
    title: "Vendors",
    icon: UserSquare2,
    href: "/dashboard/vendors",
  },
  {
    title: "Orders",
    icon: Truck,
    href: "/dashboard/orders",
  },
  {
    title: "Sales",
    icon: Truck,
    href: "/dashboard/sales",
  },
  {
    title: "Our Staff",
    icon: User,
    href: "/dashboard/staffs",
  },
  {
    title: "MVE Community",
    icon: Building2,
    href: "/dashboard/community",
  },
  {
    title: "Wallet",
    icon: CircleDollarSign,
    href: "/dashboard/wallet",
  },
  {
    title: "Settings",
    icon: LayoutGrid,
    href: "/dashboard/settings",
  },
  {
    title: "Online Store",
    icon: ExternalLink,
    href: "/",
  },
];

let catalogueLinks = [
  {
    title: "Products",
    icon: Boxes,
    href: "/dashboard/products",
  },
  {
    title: "Categories",
    icon: LayoutList,
    href: "/dashboard/categories",
  },
  {
    title: "Coupons",
    icon: ScanSearch,
    href: "/dashboard/coupons",
  },
  {
    title: "Banners",
    icon: MonitorPlay,
    href: "/dashboard/banners",
  },
];
