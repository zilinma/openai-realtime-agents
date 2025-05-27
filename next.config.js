/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Needed for Docker deployment
  eslint: {
    // Disable ESLint during production builds for better performance
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  // Enable image optimization from external domains if needed
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig; 