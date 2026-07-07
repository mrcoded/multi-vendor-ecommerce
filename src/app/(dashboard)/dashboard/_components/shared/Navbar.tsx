"use client";

import React from "react";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import { useSession } from "next-auth/react";
import UserAvatar from "@/components/UserAvatar";
import ThemeSwitcherButton from "@/components/ThemeSwitcherButton";

export default function Navbar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (v: boolean) => void;
}) {
  const { data: session } = useSession();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-md sm:px-6 lg:left-64">
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSidebar(!showSidebar);
          }}
          className="relative z-[70] rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Toggle sidebar"
        >
          {showSidebar ? (
            <X className="size-6" />
          ) : (
            <AlignJustify className="size-6" />
          )}
        </button>

        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary lg:hidden"
        >
          Belstore
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <ThemeSwitcherButton />
        {session && (
          <div className="ml-1 flex items-center rounded-xl border border-border bg-muted/30 py-1.5 pl-3 pr-3 sm:ml-2 sm:pl-4 sm:pr-4">
            <UserAvatar user={session.user} />
          </div>
        )}
      </div>
    </header>
  );
}
