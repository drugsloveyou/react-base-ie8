import React, { Component } from "react";

// 这个好用是好用，但是该死不见容IE8，我想举报IE8
// import { autobind } from "core-decorators";

//装饰器测试
function test(...arg) {
  if (arg.length === 0) {
    return function() {
      return handle(arguments);
    };
  } else {
    return handle(arg);
  }
}

function handle(arg) {
  console.log(arg);
  // console.log(target, key, { value });
}

// @test
export default class Inbox extends Component {
  // @test
  test() {}
  render() {
    return <div>this is a Isnbox.</div>;
  }
}
