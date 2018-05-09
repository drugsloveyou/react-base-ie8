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
  mode: 'development',
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
  ],
}