const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const path = require("path");
const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);



const webpackConfig = require("./webpack.dev.babel");
const addDevMiddlewares = require("./addDevMiddlewares");
addDevMiddlewares(app, webpackConfig);

// // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// // configuration file as a base.
// const middleware = webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
//   silent: true,
//   stats: "errors-only"
// });
// app.use(middleware);
// app.use(webpackHotMiddleware(compiler));

// const fs = middleware.fileSystem;
// app.get("*", (req, res) => {
//   fs.readFile(
//     path.join(compiler.outputPath, "/dist/index.html"),
//     (err, file) => {
//       if (err) {
//         res.sendStatus(404);
//       } else {
//         res.send(file.toString());
//       }
//     }
//   );
// });
const port = 3001;

// const openBrowser = require("react-dev-utils/openBrowser");
// Serve the files on port 3000.
app.listen(port, function() {
  console.log(`Example app listening on port http://localhost:${port}\n`);
  // openBrowser(`http://localhost:${port}`);
});
