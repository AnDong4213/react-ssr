/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // If you want to use SWC despite the presence of a .babelrc file you can force it in your next.config.js file.
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};
module.exports = nextConfig;
