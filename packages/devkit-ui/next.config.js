const withPlugins = require('next-compose-plugins')

const withMdx = require('@next/mdx')()

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
}

module.exports = withPlugins([withMdx], nextConfig)
