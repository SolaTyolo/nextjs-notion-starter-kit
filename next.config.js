// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const netBuildId = require('next-build-id')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  experimental: {
    staticPageGenerationTimeout: 300,
    sharedPool: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  assetPrefix: isProd ? 'https://cdn.cueture.club/blog' : '',
  generateBuildId: () => netBuildId({dir: __dirname})
}
