const express = require("express");
const logger = require("./logger");
const argv = require("./argv"); //解析命令参数
const port = require("./port"); //获取端口配置
const setup = require("./middlewares/setMiddleware"); //设置函数
const isDev = process.env.NODE_ENV !== "production"; //是否开发
//这个从外网访问内网的插件引入，如果需要从外网访问内网，则可以设置ENABLE_TUNNEL为true
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require("ngrok")
    : false;

const resolve = require("path").resolve;
const app = express();

//设置app的中间件及配置
setup(app);

const customHost = argv.host || process.env.HOST;
const host = customHost || null; //使用默认的协议
const prettyHost = customHost || "localhost";

//启动服务器
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  //外网访问的代理设置及启动
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }
      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
