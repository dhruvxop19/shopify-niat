import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack for builds to fix Tailwind CSS compatibility
  experimental: {
    turbo: undefined,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
