/*
 * 入口文件
 * @Author: xiezuobing(948466)[435321508@qq.com] 
 * @Date: 2018-05-14 15:34:45 
 * @Last Modified by: xiezuobing
 * @Last Modified time: 2018-05-14 15:51:58
 */

import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const DOM = document.getElementById("app");
const render = () => {
  ReactDOM.render(<App />, DOM);
};

if (module.hot) {
  // NOTE: accept参数值不接受动态的依赖，babel的转移时不要对exports做解释；
  // 需要禁用模块处理babel配置需要modules为false
  // 否则热加载不生效；也就是说在编译的时候必须是常量
  module.hot.accept(["./components/App"], () => {
    ReactDOM.unmountComponentAtNode(DOM);
    render();
  });
}
render();
