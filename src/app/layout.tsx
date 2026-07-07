import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeInit } from "../../.flowbite-react/init";
import ErrorBoundary from "@/components/ErrorBoundary";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "../styles/main.scss";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import UploadThingSSRPlugin from "@/components/UploadThingSSRPlugin";
import { buildCanonical, getSiteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  preload: true,
});

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark =
      theme === "dark" || ((theme === "system" || !theme) && systemDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.remove("light");
  } catch (e) {}
})();
`;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#567F1C" },
    { media: "(prefers-color-scheme: dark)", color: "#A3C34A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "BelStore | Multi Vendor E-commerce Platform",
    template: "%s | BelStore",
  },
  description:
    "BelStore is a multi-vendor e-commerce platform that allows vendors to showcase and sell their products to customers. Explore a wide range of products from various vendors and enjoy a seamless shopping experience on BelStore.",
  applicationName: "BelStore",
  keywords: [
    "BelStore",
    "Multi Vendor E-commerce Platform",
    "Vendors",
    "Products",
    "Customers",
    "Orders",
    "Sales",
    "Inventory",
  ],
  authors: [
    {
      name: "BelStore",
      url: "https://github.com/multi-vendor-ecommerce",
    },
  ],
  creator: "BelStore",
  publisher: "BelStore",
  alternates: {
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "BelStore | Multi Vendor E-commerce Platform",
    description:
      "BelStore is a multi-vendor e-commerce platform that allows vendors to showcase and sell their products to customers. Explore a wide range of products from various vendors and enjoy a seamless shopping experience on BelStore.",
    url: buildCanonical("/"),
    siteName: "BelStore",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: buildCanonical("/og-image.png"),
        width: 800,
        height: 600,
        alt: "BelStore",
      },
    ],
  },
  twitter: {
    title: "BelStore | Multi Vendor E-commerce Platform",
    description:
      "BelStore is a multi-vendor e-commerce platform that allows vendors to showcase and sell their products to customers. Explore a wide range of products from various vendors and enjoy a seamless shopping experience on BelStore.",
    creator: "@CodedLibra",
    site: "BelStore",
    card: "summary_large_image",
    images: [
      {
        url: buildCanonical("/og-image.png"),
        width: 800,
        height: 600,
        alt: "BelStore",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} max-w-full overflow-x-hidden font-sans antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <UploadThingSSRPlugin />
        <ThemeInit />
        <OrganizationJsonLd />
        <ErrorBoundary>
          <QueryProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
