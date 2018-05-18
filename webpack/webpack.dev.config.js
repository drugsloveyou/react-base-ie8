/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin"); //检查循环引用插件
const logger = require("../server/logger");
// CSS文件单独提取出来（如果需要热加载的话与css-hot-loader一起用）
// 在生产环境的时候将style-loader替换成MiniCssExtractPlugin.loader就可以了
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = require("./webpack.base.config")({
  entry: [
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
  module: {
    rules: [
      // { //热加载配置
      //   test: /\.css/,
      //   exclude: /node_modules/,
      //   use: [
      //     "css-hot-loader",
      //     MiniCssExtractPlugin.loader,
      //     "css-loader"
      //   ]
      // },
      {
        //处理自己的css文件
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              autoprefixer:
                true ||
                {
                  /*自己的配置*/
                }
            }
          }
        ]
      },
      {
        //处理自己的scss/sass文件
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        //处理自己的less文件
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        //编译处于node_modules中的css文件
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true, //js包自动注入html
      template: "src/index.html"
    }),
    //打包哦（当module已配置该插件的loader时）
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // }),
    //循环引用相关
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false //如果有则显示警告即可
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new webpack.NamedModulesPlugin() //热加载相关插件
  ],
  // 引入source-map更利于调试
  // 查看 https://webpack.js.org/configuration/devtool/#devtool
  devtool: "inline-source-map",

  performance: {
    hints: false
  }
});
