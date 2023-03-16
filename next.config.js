/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${env.process.VERCEL_URL}`,
};

module.exports = nextConfig;
