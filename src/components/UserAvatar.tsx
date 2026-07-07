"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { LayoutDashboard, LogOut, Package, Settings } from "lucide-react";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import generateInitials from "@/lib/generateInitials";
import { useIsMounted } from "@/hooks/useIsMounted";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserAvatar = ({ user }: { user: User }) => {
  const router = useRouter();
  const isMounted = useIsMounted();

  const { imageUrl, name } = user ?? {};
  const role = user?.role;
  const initials = generateInitials(name ?? "User");

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (!isMounted) {
    return <div className="h-8 w-8 rounded-full bg-muted sm:h-10 sm:w-10" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="User Profile"
              width={200}
              height={200}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-300 p-4 shadow-md dark:bg-slate-800 sm:h-10 sm:w-10">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 py-2 pr-8">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/profile-settings"
            className="flex items-center space-x-2"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        {role === "USER" && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/orders"
              className="flex items-center space-x-2"
            >
              <Package className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
