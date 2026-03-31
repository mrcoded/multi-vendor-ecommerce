import withFlowbiteReact from "flowbite-react/plugin/nextjs";

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
    {
      protocol: 'https',
      hostname: '4qmwrvytmq.ufs.sh',
    },

    ],
  },
  output: 'standalone',
};

export default withFlowbiteReact(nextConfig);