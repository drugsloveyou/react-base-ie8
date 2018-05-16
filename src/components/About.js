import React, { Component } from "react";
import http from "../http";
const API = {
  COURSES_SELECTION:
    "https://www.easy-mock.com/mock/5af58399b758743d3788f8bb/courses_selection/",
  COURSES: "https://www.easy-mock.com/mock/5af58399b758743d3788f8bb/courses/"
};
export default class About extends Component {
  constructor() {
    super();
    this.getData();
  }

  async getData() {
    let data = await http(API.COURSES);
    console.log(`
    -------------------------------------
    `,data);
  }

  render() {
    return <div>this is a Aboust.</div>;
  }
}
