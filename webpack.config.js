const path = require('path')
const env = true ? 'development' : 'production'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: {
    polyfill: [
      'babel-polyfill'
    ],
    bundle: [
      './src/index.js'
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: env,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        enforce: "post",
        loaders: ['es3ify-loader'],
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './node_modules/babel-polyfill'),
          path.resolve(__dirname, './node_modules/webpack-dev-server')
        ]
      },
    ],
  },
  plugins: [
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
    //     ie8: true,
    //   },
    //   sourceMap: true
    // })
  ],
}