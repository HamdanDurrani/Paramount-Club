import type { NextConfig } from "next";

const MEDIA_CACHE =
  "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: MEDIA_CACHE },
          { key: "CDN-Cache-Control", value: MEDIA_CACHE },
        ],
      },
    ];
  },
};

export default nextConfig;
