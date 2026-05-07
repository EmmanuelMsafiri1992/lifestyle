import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost', port: '8000' },
      { protocol: 'http',  hostname: 'localhost', port: '8001' },
      { protocol: 'http',  hostname: 'localhost', port: '8002' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Silence ESLint errors during Vercel build (warnings become errors by default)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
