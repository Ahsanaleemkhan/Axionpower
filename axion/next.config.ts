import type { NextConfig } from "next";

// Extract hostname from WP GraphQL URL so images work automatically
const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "";
const wpHostname = wpUrl ? new URL(wpUrl).hostname : "admin.ahsan-aleem.dev";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: wpHostname,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
