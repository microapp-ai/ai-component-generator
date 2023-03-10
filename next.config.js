/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://ai-component-generator-delta.vercel.app',
};

module.exports = nextConfig;
