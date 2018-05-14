const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
  mode: "none",
  babelOptions: {
    presets: [
      [
        "env",
        {
          targets: {
            browsers: ["last 2 versions", "ie >= 8"]
          },
          //开启采用则引入原则
          useBuiltIns: true,
          //debug模式
          debug: false
        }
      ],
      "react"
    ],
    plugins: [
      "add-module-exports", //模块解析
      "transform-class-properties", //类属性解析
      "syntax-async-generators", //开启generators解析
      "transform-react-remove-prop-types", //编译移除propTypes，毕竟只有在开发调试时才有用到
      "transform-react-constant-elements", //html元素静态化
      "transform-react-inline-elements" //将react的html部分转化为行内元素
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "post",
        loaders: ["es3ify-loader"],
        include: [
          path.resolve(process.cwd(), "./src"),
          path.resolve(process.cwd(), "./node_modules/babel-polyfill")
        ]
      }
    ]
  },
  plugins: [
    //抽取公共部分插件，具体配置请自行查阅
    new webpack.optimize.SplitChunksPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      //页面压缩相关配置
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
    // js代码压缩相关配置
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          properties: false,
          warnings: false
        },
        output: {
          beautify: true,
          quote_keys: true
        },
        ie8: true
      },
      sourceMap: true
    })
  ]
  // performance: {
  //   assetFilter: assetFilename =>
  //     !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  // }
});
