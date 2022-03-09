// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

module.exports = {
  experimental: {
    staticPageGenerationTimeout: 600,
    sharedPool: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}
