import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ig0yi5ximt.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "4qmwrvytmq.ufs.sh",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-slot",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "flowbite-react",
      "@tanstack/react-query",
      "react-redux",
    ],
  },
  serverExternalPackages: [
    "uploadthing",
    "@uploadthing/react",
    "@uploadthing/mime-types",
    "@uploadthing/shared",
    "isomorphic-dompurify",
    "jsdom"
  ],
  output: "standalone",
};

export default withFlowbiteReact(nextConfig);
