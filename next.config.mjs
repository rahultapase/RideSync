/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['your-image-domains.com'],
    unoptimized: false,
  },
  // Enable webpack optimization
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  },
  // Enable compression
  compress: true,
}

export default nextConfig;
