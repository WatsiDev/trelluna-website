import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // o false si es temporal
      },
    ];
  },
};

export default nextConfig;