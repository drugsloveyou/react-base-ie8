import React, { Component } from "react";
import InputBar from "./InputBar";
import Test from "./Test";

import {
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
  browserHistory,
  hashHistory,
  useRouterHistory
} from "react-router";
import { Provider} from 'react-redux';

import { createHashHistory } from "history";

import store from '../store/store';

// const history = useRouterHistory(createHashHistory)();//从3.0版本开始不需要传queryKey参数
const history = useRouterHistory(createHashHistory)({ queryKey: false });

import About from "./About";
// import Inbox from "./Inbox";

// react-router 按路由打包（分包）
// 生产环境，用的 webpack-parallel-uglify-plugin 打包的，由于它是采用 commonJS规范的，所以require不需要default，
// 开发环境下运行于浏览器，用的是es6规范，并且组件都是通过 export default 导出的，所有需要加入 .default
const Inbox  = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./Inbox').default || require('./Inbox'))
  }, 'Inbox');
};

let msg = `Fetching data.json`;
class App extends Component {
  state = {
    message: "messsage"
  };

  render() {
    // console.log("App render", this.state);
    return (
      <div>
        <h1>{msg}</h1>
        <pre>
          <code>{JSON.stringify(this.state, null, 2)}</code>
        </pre>
        <InputBar />
        <Provider store={ store }>
          <Router history={history}>
            <Route path="/" component={Test}>
              <Route path="about" component={About} />
              <Route path="inbox" getComponent={Inbox} />
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
