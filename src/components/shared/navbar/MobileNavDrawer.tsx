"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogIn, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { User } from "next-auth";

import ThemeSwitcherButton from "@/components/ThemeSwitcherButton";
import { Button } from "@/components/ui/button";
import { MOBILE_HELP_LINKS, MOBILE_LINKS } from "@/constants/navbar";
import { cn } from "@/lib/utils";

type MobileNavDrawerProps = {
  open: boolean;
  user?: User;
  onClose: () => void;
};

function DrawerHeader({ user, onClose }: { user?: User; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Welcome"}
        </p>
        <p className="text-xs text-muted-foreground">Browse BelStore</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
        aria-label="Close menu"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

function DrawerLink({
  href,
  label,
  icon: Icon,
  isActive = false,
  variant = "default",
  onNavigate,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  variant?: "default" | "help";
  onNavigate?: () => void;
}) {
  const isHelp = variant === "help";

  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
          isHelp
            ? "text-foreground hover:bg-muted"
            : isActive
              ? "bg-primary/10 font-medium text-primary"
              : "font-medium text-foreground hover:bg-muted",
        )}
      >
        <Icon className={cn("size-5 shrink-0", isHelp && "text-primary")} />
        {label}
      </Link>
    </li>
  );
}

function DrawerFooter({
  user,
  onNavigate,
}: {
  user?: User;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-3 border-t border-border p-4">
      <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
        <span className="text-sm text-foreground">Appearance</span>
        <ThemeSwitcherButton />
      </div>

      {!user ? (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login" onClick={onNavigate}>
              <LogIn className="size-4" />
              Login
            </Link>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href="/register" onClick={onNavigate}>
              Sign up
            </Link>
          </Button>
        </div>
      ) : (
        <Button variant="default" size="sm" className="w-full" asChild>
          <Link href="/dashboard" onClick={onNavigate}>
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </Button>
      )}
    </div>
  );
}

export default function MobileNavDrawer({
  open,
  user,
  onClose,
}: MobileNavDrawerProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 left-0 z-[70] flex w-[min(300px,88vw)] flex-col border-r border-border bg-card shadow-xl transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <DrawerHeader user={user} onClose={onClose} />

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-0.5">
            {MOBILE_LINKS.map((link) => (
              <DrawerLink
                key={link.href}
                {...link}
                isActive={isLinkActive(link.href)}
                onNavigate={onClose}
              />
            ))}
          </ul>

          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Help
            </p>
            <ul className="space-y-0.5">
              {MOBILE_HELP_LINKS.map((link) => (
                <DrawerLink
                  key={link.href}
                  {...link}
                  variant="help"
                  onNavigate={onClose}
                />
              ))}
            </ul>
          </div>
        </nav>

        <DrawerFooter user={user} onNavigate={onClose} />
      </aside>
    </>
  );
}
