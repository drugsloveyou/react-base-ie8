import React, { Component } from 'react'
export default class InputBar extends Component {

  constructor(props) {
    super(props)
  }

  handleChange = (e) => {
    console.log(e.target.value)
  }


  render() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    }).then((value) => {
      console.log(value)
    })
    return (
      <input placeholder="JUST DO IT."
             type="text"
             onChange={this.handleChange} />
    )
  }
}

window.test = '11111111';