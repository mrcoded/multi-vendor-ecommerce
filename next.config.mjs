/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ig0yi5ximt.ufs.sh'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
