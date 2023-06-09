/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_POCKETBASE_URL: process.env.VITE_POCKETBASE_URL,
  },
  webpack: (config) => {
    config.experiments = {
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    domains: ["localhost", "images.unsplash.com", "images.clerk.dev"],
  },
};

module.exports = nextConfig;
