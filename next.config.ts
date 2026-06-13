import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.postless.com',
        pathname: '**',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    // Helps tree-shake/optimize large package imports.
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
