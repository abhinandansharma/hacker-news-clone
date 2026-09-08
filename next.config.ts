import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '/hacker-news-clone',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
