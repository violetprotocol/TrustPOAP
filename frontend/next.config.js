/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.poap.xyz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.imgix.net",
      },
    ],
  },
};

module.exports = nextConfig
