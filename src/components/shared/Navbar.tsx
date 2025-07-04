"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

import { useSession } from "next-auth/react";

import UserAvatar from "../UserAvatar";
import SearchForm from "../forms/SearchForm";
import { HelpModal } from "../modals/HelpModal";
import ThemeSwitcherButton from "../ThemeSwitcherButton";
import CartCounter from "@/app/(other-pages)/cart/_components/CartCounter";

function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white dark:bg-slate-700">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto px-8 gap-8">
        {/* Logo */}
        <Link className="" href="/">
          <Image src="" alt="MVE logo" className="w-24" />
        </Link>

        {/* Search */}
        <div className="flex-grow">
          <SearchForm />
        </div>

        <div className="flex gap-8">
          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
            >
              <User />
              <span>Login</span>
            </Link>
          ) : (
            session?.user && <UserAvatar user={session.user} />
          )}

          <HelpModal />
          <CartCounter />
        </div>
        <ThemeSwitcherButton />
      </div>
    </div>
  );
}

export default Navbar;
