/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'ig0yi5ximt.ufs.sh',
    },
    {
      protocol: 'https',
      hostname: 'utfs.io',
    },

    ],
  },
  output: 'standalone',
};

export default nextConfig;
