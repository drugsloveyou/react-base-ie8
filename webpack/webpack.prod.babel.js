// Important modules this config uses
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = require("./webpack.base.babel")({
  // In production, we skip all hot-reloading stuff
  entry: {
    polyfill: ["babel-polyfill"],
    main: [path.join(process.cwd(), "src/prod.js")]
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
    publicPath: ""
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "post",
        loaders: ["es3ify-loader"],
        include: [
          path.resolve(__dirname, "./src"),
          path.resolve(__dirname, "./node_modules/babel-polyfill")
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.SplitChunksPlugin(),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: "src/index.html",
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true
      // },
      inject: true
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          properties: false
          // warnings: false
        },
        output: {
          // beautify: true,
          // quote_keys: true
        },
        ie8: true
      },
      sourceMap: true
    })
  ],

  // performance: {
  //   assetFilter: assetFilename =>
  //     !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  // }
});
