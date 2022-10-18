/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // If you want to use SWC despite the presence of a .babelrc file you can force it in your next.config.js file.
  // experimental: {
  //   forceSwcTransforms: true,
  // },
  images: {
    domains: ['img1.mukewang.com'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = removeImports(nextConfig);
