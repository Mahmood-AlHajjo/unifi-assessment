import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bike-watch",
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.bikeindex.org",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
