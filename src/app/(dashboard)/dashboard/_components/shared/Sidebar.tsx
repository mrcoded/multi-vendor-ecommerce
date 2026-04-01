"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronRight, LogOut, Slack } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ROLE_LINKS, SHARED_LINKS } from "@/constants/sidebar-links";

export default function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();

  const role = (session?.user?.role as keyof typeof ROLE_LINKS) || "USER";
  const links = useMemo(() => ROLE_LINKS[role], [role]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSidebar]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden",
          showSidebar ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={() => setShowSidebar(false)} // 🎯 Closes the sidebar when clicking outside
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-slate-900 transition-transform lg:translate-x-0 flex flex-col",
          showSidebar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* LOGO AREA */}
        <div className="p-6 border-b">
          <Link
            href="/"
            className="block"
            onClick={() => setShowSidebar(false)}
          >
            <Image
              src="/assets/icon.png"
              alt="logo"
              width={150}
              height={40}
              className="h-8 w-auto lg:w-16 object-contain"
            />
          </Link>
        </div>

        {/* SCROLLABLE LINKS */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar">
          <SidebarLink
            link={SHARED_LINKS.dashboard}
            isActive={pathname === "/dashboard"}
            onClick={() => setShowSidebar(false)}
          />

          {links.catalogue.length > 0 && (
            <Collapsible
              open={openMenu}
              onOpenChange={setOpenMenu}
              className="px-3"
            >
              <CollapsibleTrigger asChild>
                <button className="flex items-center justify-between w-full px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Slack className="w-5 h-5" />
                    <span className="font-medium">Catalogue</span>
                  </div>
                  {openMenu ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-1 ml-4 border-l pl-4">
                {links.catalogue.map((link) => (
                  <SidebarLink
                    key={link.href}
                    link={link}
                    isActive={pathname === link.href}
                    isSublink
                    onClick={() => setShowSidebar(false)}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {links.main.map((link) => (
            <SidebarLink
              key={link.href}
              link={link}
              isActive={pathname === link.href}
              onClick={() => setShowSidebar(false)}
            />
          ))}
        </nav>

        {/* LOGOUT AT BOTTOM */}
        <div className="p-4 border-t">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-2 xl:px-4 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-xl font-bold transition-all shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  link,
  isActive,
  isSublink,
  onClick,
}: {
  link: any;
  isActive: boolean;
  isSublink?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-6 py-2.5 transition-all relative group",
        isActive
          ? "text-lime-600 font-semibold bg-lime-50/50 dark:bg-lime-900/10"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
        isSublink && "px-3 py-1.5 text-sm",
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime-500 rounded-r-full" />
      )}
      <link.icon
        className={cn("w-5 h-5", isActive ? "text-lime-500" : "opacity-70")}
      />
      <span>{link.title}</span>
    </Link>
  );
}
