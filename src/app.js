/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// import "babel-polyfill";

// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const MOUNT_NODE = document.getElementById("app");
let translationMessages = {};
const render = messages => {
  ReactDOM.render(<App />, MOUNT_NODE);
};
console.log(11111111111111111111111111111111111111111111111111111);
// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(["./components/App"], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }
render(translationMessages);
