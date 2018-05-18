/**
 * 创建一个webpack.dll.config.js文件打包常用类库到dll中;
 * 使得开发过程中基础模块不会重复打包，而是去动态连接库里获取;
 * (注意这个是在开发环境使用，生产环境打包对时间要求并不高，后者往往是项目持续集成的一部分)
 * @Author: xiezuobing(948466)[435321508@qq.com]
 * @Date: 2018-05-17 19:56:17
 * @Last Modified by: xiezuobing
 * @Last Modified time: 2018-05-18 13:38:06
 */
const path = require("path");
const webpack = require("webpack");
/**
 * 尽量减小搜索范围
 * target: '_dll_[name]' 指定导出变量名字
 */
module.exports = {
  entry: {
    vendor: ["jquery", "lodash", "axios"]
  },
  output: {
    path: path.resolve(process.cwd(), "build"),
    filename: "[name].dll.js",
    library: "dll_[name]" // 全局变量名，其他模块会从此变量上获取里面模块
  },
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      name: "dll_[name]",
      path: path.resolve(process.cwd(), "build/manifest.json")
    })
  ]
};
