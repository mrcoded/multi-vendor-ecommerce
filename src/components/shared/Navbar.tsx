"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle, User as UserIcon } from "lucide-react";

import { User } from "next-auth";

import UserAvatar from "../UserAvatar";
import SearchForm from "../forms/SearchForm";
import ThemeSwitcherButton from "../ThemeSwitcherButton";
import CartCounter from "@/app/(other-pages)/cart/_components/CartCounter";

function Navbar({ user }: { user?: User | undefined }) {
  return (
    <div className="bg-white dark:bg-slate-700">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto gap-3 px-3 sm:px-8 sm:gap-8">
        {/* Logo */}
        <Link className="" href="/">
          <Image
            src={"/assets/icon.png"}
            alt="Belstore logo"
            width={100}
            height={100}
            className="w-10 xl:w-16 h-8"
          />
        </Link>

        {/* SEARCHBAR: Wrapped in Suspense if it uses useSearchParams */}
        <div className="hidden md:flex flex-1 max-w-md">
          <Suspense
            fallback={
              <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
            }
          >
            <SearchForm />
          </Suspense>
        </div>

        <div className="flex gap-3 md:gap-8">
          <button className="md:flex items-center space-x-1 hidden text-green-950 dark:text-slate-100">
            <HelpCircle />
            <span>Help</span>
          </button>
          <CartCounter />
          <ThemeSwitcherButton />

          <>
            {!user ? (
              <Link
                href="/login"
                className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
              >
                <UserIcon />
                <span>Login</span>
              </Link>
            ) : (
              <UserAvatar user={user} />
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
