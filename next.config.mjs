/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
