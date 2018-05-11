/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin"); //检查循环引用插件
const logger = require("../server/logger");

module.exports = require("./webpack.base.babel")({
  entry: [
    "babel-polyfill",
    "eventsource-polyfill", // IE热加载
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "src/app.js")
  ],

  // 在development环境不要用到的hash
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true, //js包自动注入html
      template: "src/index.html"
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false //如果有则显示警告即可
    }),
    new webpack.NamedModulesPlugin()
  ],
  // 引入source-map更利于调试
  // 查看 https://webpack.js.org/configuration/devtool/#devtool
  devtool: "eval-source-map",

  performance: {
    hints: false
  }
});
