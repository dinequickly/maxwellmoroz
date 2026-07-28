import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Pin the workspace root so Next ignores the stray parent lockfile.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
