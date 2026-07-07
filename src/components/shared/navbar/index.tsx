"use client";

import type { User } from "next-auth";

import { useMobileNav } from "@/hooks/useMobileNav";

import MobileNavDrawer from "./MobileNavDrawer";
import NavbarDesktopActions from "./NavbarDesktopActions";
import NavbarHeader from "./NavbarHeader";

type NavbarProps = {
  user?: User;
  showSearch?: boolean;
};

export default function Navbar({ user, showSearch = true }: NavbarProps) {
  const { mobileOpen, openMobileNav, closeMobileNav } = useMobileNav();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card">
        <NavbarHeader
          onOpenMobileNav={openMobileNav}
          onNavigate={closeMobileNav}
          showSearch={showSearch}
        >
          <NavbarDesktopActions user={user} />
        </NavbarHeader>
      </header>

      <MobileNavDrawer open={mobileOpen} user={user} onClose={closeMobileNav} />
    </>
  );
}
