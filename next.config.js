/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "earnest-clownfish-274.convex.cloud"],
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

module.exports = nextConfig;
