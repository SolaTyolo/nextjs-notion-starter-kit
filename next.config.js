// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
import fs from "fs";

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  experimental: {
    staticPageGenerationTimeout: 300,
    sharedPool: true
  },
  generateBuildId: async () => {
    return  fs.readFileSync('./VERSION').toString().trim()
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  assetPrefix: isProd ? process.env.CDN : ''
}
