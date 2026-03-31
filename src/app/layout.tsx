import { Metadata } from "next";
import { ThemeInit } from "../../.flowbite-react/init";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "../styles/main.scss";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://belstore.vercel.app"),
  title: {
    default: "BelStore | Multi Vendor E-commerce Platform",
    template: "%s | BelStore | Multi Vendor E-commerce Platform",
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
      url: "https://github.com/BelStore",
    },
  ],
  creator: "BelStore",
  publisher: "BelStore",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "BelStore | Multi Vendor E-commerce Platform",
    description:
      "BelStore is a multi-vendor e-commerce platform that allows vendors to showcase and sell their products to customers. Explore a wide range of products from various vendors and enjoy a seamless shopping experience on BelStore.",
    url: "https://belstore.vercel.app",
    siteName: "BelStore",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: "https://belstore.vercel.app/og-image.png",
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
        url: "https://belstore.vercel.app/og-image.png",
        width: 800,
        height: 600,
        alt: "BelStore",
      },
    ],
  },
  // robots: {
  //   index: false,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInit />
      </head>
      <body className="max-w-full">
        <ErrorBoundary>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
