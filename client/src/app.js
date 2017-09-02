import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view.js';
import Level from './components/level.js';
import Maps from './components/maps.js';
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

    let element = <div>YOURE HOME</div>;

    return (
      <Router>
        <div>
          <Link to='/' className="btn btn-default btn-sm">Home Page</Link>
          <Link to='/view' className="btn btn-default btn-sm">View</Link>
          <Link to='/maps' className="btn btn-default btn-sm">Maps</Link>

          <Route exact={true} path='/' render={() => (element)}></Route>
          <Route exact={true} path='/view' component={View}></Route>
          <Route exact={true} path='/maps' component={Maps}></Route>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
