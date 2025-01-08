import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "devasw7xy5fu5.cloudfront.net",
      "1stchoicebelize.com",
      "remaxcaribbeanandcentralamerica.azureedge.net",
    ], // Add your external image domain here
  },
};

export default nextConfig;
