import React from 'react';
import InputBar from './InputBar'

class App extends React.Component {
  state = {
    message: 'message'
  }

  render() {
    return (
      <div>
        <h1>Fetching data.json</h1>
        <pre><code>{ JSON.stringify(this.state, null, 2) }</code></pre>
        <InputBar />
      </div>
      );
  }
}

export default App;
