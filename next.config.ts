import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // garante URLs amigáveis
      {
        source: "/categoria/:slug/",
        destination: "/categoria/:slug",
        permanent: true,
      },
      {
        source: "/produto/:slug/",
        destination: "/produto/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
