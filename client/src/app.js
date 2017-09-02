import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Link to='/'><h3>CLICKONE</h3></Link>
          <Link to='/api/anotherone' className="btn btn-default btn-sm">LOL</Link>
          <Route exact={true} path='/' render={() => (<div>YOURE HOME</div>)}></Route>
          <Route exact={true} path='/api/anotherone' component={View}></Route>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
