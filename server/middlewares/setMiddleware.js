module.exports = app => {
  const isDev = process.env.NODE_ENV === "development",
    middleware = require("./middleWareHandler");
  let webpackConfig = {};
  if (isDev) {
    webpackConfig = require("../../webpack/webpack.dev.config");
  } else {
    webpackConfig = require("../../webpack/webpack.prod.config");
  }
  middleware(app, webpackConfig);
  return app;
};
