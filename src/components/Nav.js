import React, { Component } from "react";
import { Link } from "react-router";
export default class About extends Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
      </ul>
    );
  }
}
