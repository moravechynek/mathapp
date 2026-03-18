import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  assetPrefix: isProd ? "/<your-repository-name>/" : "",
  basePath: isProd ? "/<your-repository-name>" : "",
  output: "export",
};

export default nextConfig;
