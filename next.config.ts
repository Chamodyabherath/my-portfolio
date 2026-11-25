import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  trailingSlash: process.env.SITE_TRAILING_SLASH === "1",
  images: { qualities: [66, 75] },
};
export default nextConfig;
