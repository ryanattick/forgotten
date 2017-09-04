// React
import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';

// Components
import Account from './components/account.js';
import Maps from './components/maps.js';
import Backpack from './components/backpack/backpack.js';
import About from './components/about.js';

// React Router
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// All specified react router routes for the front end rendering
var allReactRoutes = {
  account: 0,
  maps: 1,
  backpack: 2,
  about: 3
};

// Handles position of the InkBar in the tabs based on the current urlTabIndex
// fixes the problem of InkBar shifting to default/index position upon refresh
// It is assumed that all routes are one worded (e.g. .../example, .../another)
// input: routes - object with keys as route strings wihtout '/'; values - integer values, indeces
// output: index (integer)
var tabIndexBasedOnURL = (routes, indexTab) => {
  var splitURL = document.URL.split('/');
  var urlTabIndex = routes[splitURL[splitURL.length - 1]];
  return urlTabIndex ? urlTabIndex : indexTab;
};

// Component responsible for rendering the main control panel (App Bar)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentTabIndex: tabIndexBasedOnURL(allReactRoutes, 1)
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(value) {
    this.setState({
      currentTabIndex: value
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <div>
              <Tabs initialSelectedIndex={this.state.currentTabIndex} onChange={this.handleTabChange}>
                <Tab value={0} label='My Account' containerElement={<Link to='/account'/>}/>
                <Tab value={1} label='Maps' containerElement={<Link to='/maps'/>}/>
                <Tab value={2} label='Backpack' containerElement={<Link to='backpack'/>}/>
                <Tab value={3} label='About' containerElement={<Link to='/about'/>}/>
              </Tabs>
            </div>

            {/* Index (Default) Route, Redirect keeps on giving warnings and IndexRoute has been deprecated */}
            <Route exact={true} path='/' component={Maps}></Route>

            <Route exact={true} path='/account' component={Account}></Route>
            <Route exact={true} path='/maps' component={Maps}></Route>
            <Route exact={true} path='/backpack' component={Backpack}></Route>
            <Route exact={true} path='/about' component={About}></Route>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
