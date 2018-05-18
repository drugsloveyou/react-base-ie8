const chalk = require("chalk"); //颜色插件
const ip = require("ip"); //ip插件
const openBrowser = require("react-dev-utils/openBrowser");

const divider = chalk.gray("\n-----------------------------------");

/**
 * 日志中间件
 */
const logger = {
  // 错误
  error: err => {
    console.error(chalk.red(err));
  },

  // 使用express.js启动app
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Server started ! ${chalk.green("✓")}`);
    
    // 外网访问启动
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green("✓")}`);
    }

    //在浏览器中打开
    // openBrowser(`http://${host}:${port}`);
    //提示
    console.log(`
${chalk.bold("Access URLs:")}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
    
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted
          ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
          : "")}${divider}

${chalk.blue(`Press ${chalk.italic("CTRL-C")} to stop`)}
    `);
  }
};

module.exports = logger;
