import React from 'react';
import ReactDOM from 'react-dom';
import Account from './components/account.js';
import Maps from './components/maps.js';
import Backpack from './components/backpack.js';
import About from './components/about.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute
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
          <Link to='/account' className="btn btn-default btn-sm">My Account</Link>
          <Link to='/maps' className="btn btn-default btn-sm">Maps</Link>
          <Link to='/backpack' className="btn btn-default btn-sm">Backpack</Link>
          <Link to='/about' className="btn btn-default btn-sm">About</Link>

          <Route exact={true} path='/account' component={Account}></Route>
          <Route exact={true} path='/maps' component={Maps}></Route>
          <Route exact={true} path='/backpack' component={Backpack}></Route>
          <Route exact={true} path='/about' component={About}></Route>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
