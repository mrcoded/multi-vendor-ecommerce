"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                height={40}
                width={120}
                className="w-auto h-10"
                src="/assets/icon.png"
                alt="Belstore Vendor Logo"
              />
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-6 max-w-xs">
              The ultimate multi-vendor marketplace for digital assets and
              learning resources. Empowering creators and learners across the
              globe.
            </p>

            <div className="flex items-center space-x-4 mt-8">
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
            </div>
          </div>

          {/* Nav Groups */}
          <FooterGroup title="Platform">
            <FooterLink href="#">Browse Products</FooterLink>
            <FooterLink href="/vendor-pricing">Sell with Us</FooterLink>
            <FooterLink href="#">Affiliate Program</FooterLink>
          </FooterGroup>

          <FooterGroup title="Support">
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Contact Sales</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </FooterGroup>

          {/* Newsletter Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              Stay Updated
            </p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Subscribe for the latest product releases and seller tips.
            </p>

            <form className="mt-4 flex flex-col sm:flex-row gap-2 w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="w-auto px-4 py-2.5 text-sm text-slate-900 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-lime-600 rounded-lg hover:bg-lime-700 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
            © {currentYear} Belstore Marketplace. Built by{" "}
            <span className="text-lime-600 font-medium">mrcoded</span>.
          </p>
          <span className="text-xs text-slate-500 hover:text-lime-600">
            System Status
          </span>
        </div>
      </div>
    </footer>
  );
};

// --- Sub-components to keep code clean ---

const FooterGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
      {title}
    </p>
    <ul className="mt-6 space-y-4">{children}</ul>
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="text-sm text-slate-600 dark:text-slate-400 hover:text-lime-600 dark:hover:text-lime-500 transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    className="p-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 rounded-full hover:bg-lime-600 hover:text-white dark:hover:bg-lime-600 transition-all duration-300"
  >
    {icon}
  </Link>
);

export default Footer;
