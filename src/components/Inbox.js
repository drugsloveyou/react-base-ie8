import React, { Component } from "react";
import { connect } from 'react-redux';

import testAction from '../store/test/testAction';

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
class Inbox extends Component {
  // @test
  test() {}
  componentWillMount() {
    // 获取数据
    this.props.getData();
  }
  render() {
    return <div>this is a Isnbox.<span>data from redux is: { this.props.string }</span></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    string: state.test.string
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getData: (...args) => dispatch(testAction.getData(...args))
  }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);