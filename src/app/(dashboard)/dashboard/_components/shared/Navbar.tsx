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
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b z-30 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents the click from bubbling
            setShowSidebar(!showSidebar);
          }}
          className="p-2 rounded-lg lg:hidden relative z-[70] text-slate-600 dark:text-slate-300"
        >
          {showSidebar ? (
            <X className="w-6 h-6" />
          ) : (
            <AlignJustify className="w-6 h-6" />
          )}
        </button>

        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-lime-600 lg:hidden"
        >
          Belstore
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcherButton />
        {session && (
          <div className="border-l pl-4 dark:border-slate-700">
            <UserAvatar user={session.user} />
          </div>
        )}
      </div>
    </header>
  );
}
