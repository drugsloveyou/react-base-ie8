import React, { Component } from "react";
import Nav from "./Nav";
export default class Test extends Component {
  render() {
    return (
      <div>
        <Nav />hassssshsah
        {this.props.children}
      </div>
    );
  }
}
