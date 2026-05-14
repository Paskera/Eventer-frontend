import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'cdn2.thecatapi.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 's0.rbk.ru' },
      { hostname: 'eventer-app.ru' },
    ],
  },
};

export default nextConfig;
