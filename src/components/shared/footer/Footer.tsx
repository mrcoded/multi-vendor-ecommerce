import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import {
  FOOTER_LEGAL_LINKS,
  FOOTER_LINK_GROUPS,
  FOOTER_PAYMENT_METHODS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TRUST_FEATURES,
  type FooterLinkItem,
} from "@/constants/footer";

import FooterNewsletter from "./FooterNewsletter";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <section
        aria-label="Shopping guarantees"
        className="border-b border-border bg-muted/40"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
          {FOOTER_TRUST_FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex items-center">
              <Image
                height={40}
                width={120}
                className="h-10 w-auto"
                src="/assets/icon.png"
                alt="BelStore"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Nigeria&apos;s multi-vendor marketplace for digital products,
              learning resources, and creator tools — all in one place.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {FOOTER_SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-0 lg:col-span-4">
            <div className="hidden gap-8 lg:grid lg:grid-cols-2">
              {FOOTER_LINK_GROUPS.map((group) => (
                <FooterLinkGroupDesktop key={group.title} {...group} />
              ))}
            </div>

            <div className="divide-y divide-border lg:hidden">
              {FOOTER_LINK_GROUPS.map((group) => (
                <FooterLinkGroupMobile key={group.title} {...group} />
              ))}
            </div>
          </div>

          <FooterNewsletter />
        </div>
      </div>

      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground">
              We accept
            </span>
            {FOOTER_PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <nav
              aria-label="Legal"
              className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"
            >
              {FOOTER_LEGAL_LINKS.map((link) => (
                <FooterLink key={link.label} {...link} className="text-xs" />
              ))}
            </nav>

            <p className="text-xs text-muted-foreground">
              © {currentYear} BelStore. Built by{" "}
              <span className="font-medium text-foreground">mrcoded</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroupDesktop({
  title,
  links,
}: {
  title: string;
  links: FooterLinkItem[];
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLinkGroupMobile({
  title,
  links,
}: {
  title: string;
  links: FooterLinkItem[];
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <ul className="space-y-3 pb-4">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </details>
  );
}

function FooterLink({
  href,
  label,
  external,
  className,
}: FooterLinkItem & { className?: string }) {
  const classes = `text-sm text-muted-foreground transition-colors hover:text-primary ${className ?? ""}`;

  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
