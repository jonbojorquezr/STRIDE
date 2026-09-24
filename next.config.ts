import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/recover", destination: "/producto", permanent: true },
      { source: "/endure", destination: "/creatina", permanent: true },
      { source: "/hydrate", destination: "/electrolitos", permanent: true },
    ];
  },
};

export default nextConfig;
