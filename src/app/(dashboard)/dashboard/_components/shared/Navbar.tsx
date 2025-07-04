"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, Bell, X } from "lucide-react";

import { useSession } from "next-auth/react";

import UserAvatar from "@/components/UserAvatar";
import ThemeSwitcherButton from "@/components/ThemeSwitcherButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ showSidebar, setShowSidebar }: NavbarProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-between lg:justify-end bg-white text-slate-50 dark:bg-slate-800 h-20 p-8 fixed top-0 w-full z-50 lg:pr-[20rem]">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-lime-700 dark:text-lime-500 lg:hidden"
      >
        <AlignJustify />
      </button>
      <Link href="/dashboard" className="sm:hidden">
        Logo
      </Link>
      <div className="inline-flex space-x-3">
        <ThemeSwitcherButton />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
            >
              <Bell className="text-lime-700 dark:text-lime-500" />

              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-1 end-6 dark:border-gray-900">
                20
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-4 py-2 pr-8">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/userprofile.png"
                  alt="User Profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col space-y-1">
                  <p>Yellow Sweet Corn Stock out,</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-2 py-0.5 bg-red-700 text-white rounded-full text-sm">
                      Stock Out
                    </p>
                    <p>Dec 12, 2021 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/userprofile.png"
                  alt="User Profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col space-y-1">
                  <p>Yellow Sweet Corn Stock out,</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-2 py-0.5 bg-red-700 text-white rounded-full text-sm">
                      Stock Out
                    </p>
                    <p>Dec 12, 2021 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/userprofile.png"
                  alt="User Profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col space-y-1">
                  <p>Yellow Sweet Corn Stock out,</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-2 py-0.5 bg-red-700 text-white rounded-full text-sm">
                      Stock Out
                    </p>
                    <p>Dec 12, 2021 - 12:40PM</p>
                  </div>
                </div>
                <button>
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {status === "authenticated" && (
          <UserAvatar user={session?.user ?? null} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
