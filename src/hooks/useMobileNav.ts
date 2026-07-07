"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useMobileNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMobileNav = () => setMobileOpen(true);
  const closeMobileNav = () => setMobileOpen(false);

  return { mobileOpen, openMobileNav, closeMobileNav };
}
