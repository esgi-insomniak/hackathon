/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_POCKETBASE_URL: process.env.VITE_POCKETBASE_URL,
    NEXT_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
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
  crossOrigin: "anonymous",
};

module.exports = nextConfig;
