/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/github-stars',
  experimental: {
    serverActions: {
      allowedOrigins: 'scastiel.dev',
    },
  },
}

module.exports = nextConfig
