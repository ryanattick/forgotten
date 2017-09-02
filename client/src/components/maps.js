import React from 'react';
import Level from './level.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Maps = (props) => {
  return (
    <Router>
      <div>
        <h1>This is Maps Page</h1>
        <Link to='/maps/level' className="btn btn-default btn-sm">Level</Link>
        <Route exact path='/maps/level' component={Level}></Route>
      </div>
    </Router>
  );
};

export default Maps;
