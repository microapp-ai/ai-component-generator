/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Remove the assetPrefix to let Next.js handle asset paths automatically
  // This ensures JavaScript files are loaded correctly in all environments
  webpack: (config) => {
    // Optimize JavaScript loading
    config.optimization.runtimeChunk = 'single';
    return config;
  },
  // Configure image domains if needed
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
