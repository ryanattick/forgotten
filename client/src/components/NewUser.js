import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    img: 'http://i.imgur.com/sDumOv4.png',
    title: 'Pick Me!1',
    author: 'jill111',
  },
  {
    img: 'http://i.imgur.com/ew2LXfi.png',
    title: 'Pick Me!2',
    author: 'pashminu',
  },
  {
    img: 'http://i.imgur.com/ySFaL6P.png',
    title: 'Pick Me!3',
    author: 'Danson67',
  },
  {
    img: 'http://i.imgur.com/8jgFRP1.png',
    title: 'Pick Me!4',
    author: 'fancycrave1',
  },
  {
    img: 'http://i.imgur.com/7oyODCg.png',
    title: 'Pick Me!5',
    author: 'Hans',
  },
];


class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      firstName: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };

// componentWillMount() {
//   $.get( "/user", function( data ) {
//   this.setState({
//     firstName: data.firstName //might need to be refactored to reflect the actual property containing the user's first name
//   })
// });
// }

handleAvatarClick(tile) {
  console.log(tile, 'click')
}

handleToggle() {
  this.setState({sidebar: !this.state.sidebar})
};

handleClose() {
  this.setState({sidebar: false})
};

  render () {
    return (
      <Router>
        <div>
      <MuiThemeProvider>
          <div>
            <div className="App-header" style={{
              background: '#222',
              height: '80px',
              padding: '20px',
              color: 'white'
              }}>
            <h1 style = {{
              float: 'left'
            }}>FORGOTTEN</h1>
            <div>
            </div>
            <div>
              <RaisedButton
                label="Main Menu"
                onClick={this.handleToggle}
                style={{
                  float: 'right'
                }}
              />
              <Drawer
                docked={false}
                width={200}
                open={this.state.sidebar}
                onRequestChange={(sidebar) => this.setState({sidebar})}
              >
                <Link to='/account'>
                  <MenuItem onClick={this.handleClose}>Account</MenuItem>
                </Link>
                <MenuItem onClick={this.handleClose}>Maps</MenuItem>
                <MenuItem onClick={this.handleClose}>Levels</MenuItem>
                <MenuItem onClick={this.handleClose}>Backpack</MenuItem>
              </Drawer>
            </div>
          </div>
          <h3>Welcome to Forgotten, [first name]. Choose your character.</h3>
          <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile, index) => (
              <GridTile
                key={index}
                title={tile.title}
                titleStyle={styles.titleStyle}
                onClick={this.handleAvatarClick.bind(this, tile)}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
        <Switch>
          <Route exact={true} path='/account' render={() => {
              return (
              <h1>ACCOUNT GOES HERE</h1>
            )}}/>
        </Switch>
      </div>
      </MuiThemeProvider>
    </div>
  </Router>
    )
  }
};

export default NewUser;
