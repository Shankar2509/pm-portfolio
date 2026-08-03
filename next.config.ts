import type { NextConfig } from "next";
import path from "node:path";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Keep tracing rooted on this app — a lockfile higher in the home directory
  // otherwise makes Next infer the wrong workspace root.
  outputFileTracingRoot: path.join(process.cwd()),
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
