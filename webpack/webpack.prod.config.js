const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
/**
 * 在babel配置下
 * "loose": true,
 * "modules": false
 */

module.exports = require("./webpack.base.config")({
  entry: {
    polyfill: ["babel-polyfill"],
    main: [path.join(process.cwd(), "src/prod.js")]
  },

  output: {
    // 这里是文件名配置规则
    filename: "[name].[chunkhash:5].js",
    // 文件块名配置规则
    chunkFilename: "[name].[chunkhash:5].chunk.js",
    // 这里根据实际的上限规则配置
    publicPath: ""
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "post",
        loaders: ["es3ify-loader"],
        include: [
          path.resolve(process.cwd(), "./src"),
          path.resolve(process.cwd(), "./node_modules/axios"),
          path.resolve(process.cwd(), "./node_modules/babel-polyfill")
        ]
      }
    ]
  },
  // 新增优化配置，压缩插件配置在plugins黎明会被覆盖哦
  // https://webpack.js.org/configuration/optimization/
  optimization: {
    //webpack4.x的最新优化配置项，用于提取公共代码
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        }
      }
    },
    //是否压缩
    // minimize: false
    minimizer: [
      // 多入口使用
      new WebpackParallelUglifyPlugin({
        uglifyJS: {
          output: {
            beautify: false, //不需要格式化
            comments: false //不保留注释
          },
          compress: {
            warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            // collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
          },
          ie8: true
        }
      })
      // 单入口使用（如果多入口使用和这个，编译后的js会有问题）
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       properties: false,
      //       warnings: false
      //     },
      //     output: {
      //       // beautify: true,
      //       quote_keys: true
      //     },
      //     ie8: true
      //   },
      //   sourceMap: true
      // })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      // 页面压缩相关配置
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    // new UglifyJsPlugin({ uglifyOptions: { ie8: true } })
    // js代码压缩相关配置

    new ProgressBarPlugin({
      format:
        "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
    })
  ],
  devtool: false
  // performance: {
  //   assetFilter: assetFilename =>
  //     !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  // }
});
