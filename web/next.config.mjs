/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dzgbuobd25m4d.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
