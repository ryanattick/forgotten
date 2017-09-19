// React
import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';

// Components
import Account from './components/account/account.js';
import Maps from './components/maps/maps.js';
import Backpack from './components/backpack/backpack.js';
import About from './components/about.js';
import Storyline from './components/storyline/storyline.js';

// React Router
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Styling
import styles from '../../styles/app.css';


//Badges (Notifications)
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Request from '../../helpers/requests';


// All specified react router routes for the front end rendering
var allReactRoutes = {
  account: 0,
  maps: 1,
  backpack: 2,
  storyline: 3,
  about: 4
};

// Handles position of the InkBar in the tabs based on the current urlTabIndex
// fixes the problem of InkBar shifting to default/index position upon refresh
// It is assumed that all routes are one worded (e.g. .../example, .../another)
// input: routes - object with keys as route strings wihtout '/'; values - integer values, indeces
// output: index (integer)
var tabIndexBasedOnURL = (routes, indexTab) => {
  var splitURL = document.URL.split('/');
  var urlTabIndex = routes[splitURL[splitURL.length - 1]];
  return routes.hasOwnProperty(splitURL[splitURL.length - 1]) ? urlTabIndex : indexTab;
};

// Component responsible for rendering the main control panel (App Bar)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentTabIndex: tabIndexBasedOnURL(allReactRoutes, 1),
      numberNewOfItems: 0,
      level: 0
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleBadgeToZero = this.handleBadgeToZero.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
  }


  handleTabChange(value) {
    this.setState({
      currentTabIndex: value
    });
  }

  handleBadgeToZero() {
    this.setState({
      numberNewOfItems: 0
    });
  }

  handleBadgeChange(num) {
    let newItemCount = this.state.numberNewOfItems
    num.forEach((item) => {
      if (item.puzzle_id === this.state.level) {
        newItemCount++
      }
    });
    this.setState({
      numberNewOfItems: newItemCount
    });
  }


  render() {

    let badge = <Badge badgeContent={this.state.numberNewOfItems} primary={true} badgeStyle={{backgroundColor: '#E94F37', float: 'right', marginTop: '7px'}}/>
    let backpackTab = this.state.numberNewOfItems ? <Tab value={2} containerElement={<Link to='/backpack'/>} onActive={this.handleBadgeToZero} icon={badge}/> : <Tab value={2} label='Backpack' containerElement={<Link to='/backpack'/>}/>;

    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <div>
              <Tabs
                className={styles.app}
                tabItemContainerStyle={{backgroundColor: 'rgba(57, 62, 65, 0.55)'}}
                initialSelectedIndex={this.state.currentTabIndex}
                onChange={this.handleTabChange}
                inkBarStyle={{backgroundColor: '#E94F37'}}>
                <Tab value={0} label='My Account' containerElement={<Link to='/account'/>}/>
                <Tab value={1} label='Maps' containerElement={<Link to='/maps'/>}/>
                {backpackTab}
                <Tab value={3} label='Storyline' containerElement={<Link to='/storyline'/>}/>
                <Tab value={4} label='About' containerElement={<Link to='/about'/>}/>
              </Tabs>
            </div>

            {/* Index (Default) Route, Redirect keeps on giving warnings and IndexRoute has been deprecated */}
            <Route exact={true} path='/' component={Maps}></Route>
            <Route exact={true} path='/account' component={Account}></Route>
            <Route exact={true} path='/maps' render={(props) => ( <Maps handleBadgeChange={this.handleBadgeChange} /> )}></Route>
            <Route exact={true} path='/backpack' component={Backpack}></Route>
            <Route exact={true} path='/storyline' component={Storyline}></Route>
            <Route exact={true} path='/about' component={About}></Route>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
export default App;
ReactDOM.render(<App />, document.getElementById('root'));
