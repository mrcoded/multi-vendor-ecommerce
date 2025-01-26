import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { LayoutDashboard, LogOut, Settings } from "lucide-react";

import { signOut } from "next-auth/react";
import generateInitials from "@/lib/generateInitials";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserAvatarProps {
  role: string;
  name: string;
  email: string;
  imageUrl?: string;
}

const UserAvatar = ({ user }: { user: UserAvatarProps }) => {
  const router = useRouter();

  //destructure image and name of a user
  const { imageUrl, name } = user;
  const role = user?.role;

  const initials = generateInitials(name);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

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
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 p-4 flex items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 shadow-md border border-slate-600">
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
            href="/dashboard/profile"
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
              <Settings className="mr-2 h-4 w-4" />
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
