import React, { Component } from "react";
import http from "../http";
const API = {
  COURSES_SELECTION:
    "/mock/5af58399b758743d3788f8bb/courses_selection/",
  COURSES: "/mock/5af58399b758743d3788f8bb/courses/",
};
export default class About extends Component {
  constructor() {
    super();
    this.getData();
  }

  async getData() {
    let data = await http(API.COURSES_SELECTION);
    console.log(
      `
    -------------------------------------
    `,
      data
    );

    http(API.COURSES).then(data => {
      console.log(
        `
    -------------------------------------
    `,
        data,
        JSON.stringify(data)
      );
    });
  }

  render() {
    return <div>this is a Aboust.</div>;
  }
}
