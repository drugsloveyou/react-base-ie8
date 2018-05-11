/* 
 * webpack 配置基础文件
 * @Author: xiezuobing(948466)[435321508@qq.com] 
 * @Date: 2018-05-11 20:30:49 
 * @Last Modified by: xiezuobing
 * @Last Modified time: 2018-05-11 21:58:05
 */

const path = require("path");
const webpack = require("webpack");

module.exports = options => {
  let rules = [
    {
      test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }
    // {
    //   // Preprocess our own .css files
    //   // This is the place to add your own loaders (e.g. sass/less etc.)
    //   // for a list of loaders, see https://webpack.js.org/loaders/#styling
    //   test: /\.css$/,
    //   exclude: /node_modules/,
    //   use: ["style-loader", "css-loader"]
    // },
    // {
    //   // Preprocess 3rd party .css files located in node_modules
    //   test: /\.css$/,
    //   include: /node_modules/,
    //   use: ["style-loader", "css-loader"]
    // },
    // {
    //   test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
    //   use: "file-loader"
    // },
    // {
    //   test: /\.(jpg|png|gif)$/,
    //   use: [
    //     "file-loader",
    //     {
    //       loader: "image-webpack-loader",
    //       options: {
    //         progressive: true,
    //         optimizationLevel: 7,
    //         interlaced: false,
    //         pngquant: {
    //           quality: "65-90",
    //           speed: 4
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   test: /\.html$/,
    //   use: "html-loader"
    // },
    // {
    //   test: /\.json$/,
    //   use: "json-loader"
    // },
    // {
    //   test: /\.(mp4|webm)$/,
    //   use: {
    //     loader: "url-loader",
    //     options: {
    //       limit: 10000
    //     }
    //   }
    // }
  ].concat((options.module.rules = options.module.rules || []));

  console.log(rules);

  return {
    entry: options.entry,
    output: Object.assign(
      {
        path: path.resolve(process.cwd(), "build")
      },
      options.output
    ),
    mode: options.mode || process.env.NODE_ENV,
    module: {
      rules: rules
    },
    plugins: options.plugins.concat([
      // new webpack.ProvidePlugin({
      //   fetch: "exports-loader?self.fetch!whatwg-fetch"
      // }),
      // 环境变量定义插件
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ])
    // resolve: {
    //   modules: ["app", "node_modules"],
    //   extensions: [".js", ".jsx", ".react.js"],
    //   mainFields: ["browser", "jsnext:main", "main"]
    // },
    // devtool: options.devtool,
    // target: "web", // Make web variables accessible to webpack, e.g. window
    // performance: options.performance || {}
  };
};
