import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
    console.log('APP');
    return (
      <div>
        <h1>Hello World from APP COMPONENT</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
