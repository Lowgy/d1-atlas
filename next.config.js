/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
