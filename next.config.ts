import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
