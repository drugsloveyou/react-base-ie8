import React, { Component } from 'react'
export default class InputBar extends Component {

  constructor(props) {
    super(props)
  }

  handleChange = (e) => {
    console.log(e.target.value)
  }


  render() {
    return (
      <input placeholder="JUST DO IT." type="text" onChange={ this.handleChange } />
    )
  }
}

window.test = '11111111';