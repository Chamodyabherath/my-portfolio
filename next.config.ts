import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  images: { qualities: [66, 75] },
};
export default nextConfig;
