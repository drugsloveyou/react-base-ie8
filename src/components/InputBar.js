/**
 * @Author: xiezuobing(948466)[435321508@qq.com] 
 * @Date: 2018-05-22 18:48:49 
 * @Last Modified by: xiezuobing
 * @Last Modified time: 2018-05-22 18:49:55
 */
import React, { Component } from "react";
// 这个插件最多兼容到ie9，不兼容ie8
// import { autobind } from "core-decorators";
export default class InputBar extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    console.log(this);
    console.log(e.target.value);
  }
  
  render() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    }).then(value => {
      console.log("promise test", value);
    });

    function* helloWorldGenerator() {
      yield "hello";
      yield "world";
      return "ending";
    }

    var hw = helloWorldGenerator();

    setTimeout(() => {
      let i = hw.next();
      let j = hw.next();
      let w = hw.next();
      console.log(i, j, w);
    }, 1000);

    let i = test();
    async function test() {
      let value = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1);
        }, 2000);
      });
      console.log("await", 1, i, value);
    }

    console.log("asyncsss awsssaist ret", i);
    return (
      <div>
        <input
          placeholder="JUST sDO ssssssIT."
          type="text"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

window.test = "11111111";
