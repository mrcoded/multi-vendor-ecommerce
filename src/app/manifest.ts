import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BelStore | Multi Vendor E-commerce",
    short_name: "BelStore",
    description:
      "Shop from multiple vendors on BelStore — a modern multi-vendor marketplace.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#118C4E",
    icons: [
      {
        src: "/assets/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
