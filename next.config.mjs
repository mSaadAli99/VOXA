/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.launchuicomponents.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/audio/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "audio/mpeg",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
