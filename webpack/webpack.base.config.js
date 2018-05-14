/* 
 * webpack 配置基础文件
 * @Author: xiezuobing(948466)[435321508@qq.com] 
 * @Date: 2018-05-11 20:30:49 
 * @Last Modified by: xiezuobing
 * @Last Modified time: 2018-05-14 15:33:28
 */

const path = require("path");
const webpack = require("webpack");
module.exports = options => {
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
      rules: (options.module ? options.module.rules : []).concat([
        {
          //babel转换
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: options.babelOptions
          }
        },
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
        },
        //字体文件解析
        {
          test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
          use: "file-loader"
        },
        //图片解析
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            "file-loader",
            {
              //引用图片压缩插件
              loader: "image-webpack-loader",
              options: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: "65-90",
                  speed: 4
                }
              }
            },
            {
              loader: "url-loader",
              options: {
                // 指定限制
                limit: 10000
              }
            }
          ]
        },
        //html解析
        {
          test: /\.html$/,
          use: "html-loader"
        },
        //json文件解析
        {
          test: /\.json$/,
          use: "json-loader"
        },
        //视频文件解析
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        }
      ])
    },
    plugins: options.plugins.concat([
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
