import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint को ignore करने के लिए specific directories
    dirs: ['pages', 'components', 'app', 'src'],
    // Generated files को ignore करें
    ignoreDuringBuilds: false,
  },
  // TypeScript config
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1vvlev3ras.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
};

export default nextConfig;
