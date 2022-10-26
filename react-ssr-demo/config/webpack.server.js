const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: path.resolve(__dirname, "../src/server.js"),
  output: {
    filename: "bundle_server.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
  externals: [webpackNodeExternals()]
};
