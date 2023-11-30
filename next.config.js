/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/github-stars',
  experimental: {
    serverActions: {
      allowedOrigins: 'scastiel.dev',
    },
  },
}

const { withPlausibleProxy } = require('next-plausible')
module.exports = withPlausibleProxy()(nextConfig)
