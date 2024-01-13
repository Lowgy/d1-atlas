/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/i/**',
      },
    ],
  },
};

module.exports = nextConfig;
