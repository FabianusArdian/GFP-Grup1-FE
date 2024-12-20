
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Change from 'export' to 'standalone'
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['images.unsplash.com'], // Add image domains
    unoptimized: true 
  },
};

module.exports = nextConfig;
