import Link from "next/link";
import { HelpCircle, User as UserIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { User } from "next-auth";

import CartCounter from "@/app/(other-pages)/cart/_components/CartCounter";
import ThemeSwitcherButton from "@/components/ThemeSwitcherButton";
import UserAvatar from "@/components/UserAvatar";
import { DESKTOP_NAV_LINKS } from "@/constants/navbar";

type NavbarDesktopActionsProps = {
  user?: User;
};

function DesktopNavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="hidden items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-muted hover:text-primary lg:flex"
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function AuthAction({ user }: { user?: User }) {
  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted hover:text-primary md:gap-1.5 md:px-2 md:py-1.5"
      >
        <UserIcon className="size-5" />
        <span className="hidden text-sm font-medium md:inline">Login</span>
      </Link>
    );
  }

  return <UserAvatar user={user} />;
}

export default function NavbarDesktopActions({
  user,
}: NavbarDesktopActionsProps) {
  return (
    <div className="ml-auto flex items-center gap-0.5 sm:gap-1 md:gap-3">
      {DESKTOP_NAV_LINKS.map((link) => (
        <DesktopNavLink key={link.href} {...link} />
      ))}

      <Link
        href="tel:08023440000"
        className="hidden size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted hover:text-primary md:inline-flex"
        aria-label="Help"
      >
        <HelpCircle className="size-5" />
      </Link>

      <CartCounter />

      <div className="hidden md:block">
        <ThemeSwitcherButton />
      </div>

      <AuthAction user={user} />
    </div>
  );
}
