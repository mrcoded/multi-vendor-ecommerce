"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronRight, LogOut, Slack } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSidebar]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden",
          showSidebar ? "visible opacity-100" : "invisible opacity-0",
        )}
        onClick={() => setShowSidebar(false)}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card transition-transform lg:translate-x-0",
          showSidebar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-border p-6">
          <Link
            href="/"
            className="block text-xl font-bold tracking-wide text-primary"
          >
            Belstore
          </Link>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto py-4">
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
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Slack className="size-5" />
                    <span className="font-medium">Catalogue</span>
                  </div>
                  {openMenu ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
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

        <div className="border-t border-border p-4">
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full gap-2 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
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
  link: {
    href: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  isActive: boolean;
  isSublink?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 px-6 py-2.5 transition-all",
        isActive
          ? "bg-primary/10 font-semibold text-primary"
          : "text-muted-foreground hover:text-foreground",
        isSublink && "px-3 py-1.5 text-sm",
      )}
    >
      {isActive && (
        <div className="absolute bottom-0 left-0 top-0 w-1 rounded-r-full bg-primary" />
      )}
      <link.icon
        className={cn("size-5", isActive ? "text-primary" : "opacity-70")}
      />
      <span>{link.title}</span>
    </Link>
  );
}
