// React
import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

// Components
import Account from './components/account.js';
import Maps from './components/maps.js';
import Backpack from './components/backpack/backpack.js';
import About from './components/about.js';

// React Router
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// Component responsible for rendering the main control panel (App Bar)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <div>
              <Toolbar>
                <ToolbarGroup>
                  <div><Link to='/account'><RaisedButton label='My Account'/></Link></div>
                </ToolbarGroup>
                <ToolbarGroup>
                  <div><Link to='/maps'><RaisedButton label='Maps'/></Link></div>
                </ToolbarGroup>
                <ToolbarGroup>
                  <div><Link to='/backpack'><RaisedButton label='Backpack'/></Link></div>
                </ToolbarGroup>
                <ToolbarGroup>
                  <div><Link to='/about'><RaisedButton label='About'/></Link></div>
                </ToolbarGroup>
              </Toolbar>
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
