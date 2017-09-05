import React from 'react';
import NewAvatar from './NewAvatar.js';
import $ from 'jquery';
import EditAccount from './EditAccount.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Popup, { P } from 'react-popup-master';


const style = {
  margin: 10,
};


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
      userInfo: {
        id: 1,
        avatar: 'http://i.imgur.com/8jgFRP1.png',
        firstName: 'Ryan',
        lastName: 'Attick',
        email: 'whatever@gmail.com',
        password: 'password',
        level: '9'
      } //replace with data
    }
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteAccountClick = this.handleDeleteAccountClick.bind(this);
  }

  // componentWillMount () {
  //   $.get('/userInfo', (userInfo) => {
  //     this.setState({
  //       userInfo: userInfo
  //     });
  //   });
  // }; //once backend is connected

  handleChangeAvatar () {
    this.setState({
      page: 'avatar'
    }, function() {
      console.log(this.state.page);
    });
  };

  handleEditClick () {
    this.setState({
      page: 'edit'
    });
  };

  handleDeleteAccountClick () {
    // $.post('/deleteUser', {id: this.state.userInfo.id}, (data) => {
    //   console.log(data, 'Account delete success.')
    // });
    console.log('DELETED')
  };



  render() {

  let currentPage = this.state.page;


    return (
      <div>
        {currentPage === 'edit' &&
          <EditAccount userInfo={this.state.userInfo}/>
        }
        {currentPage === 'avatar' &&
          <NewAvatar/>
        }
        {currentPage === 'main' &&
        <MuiThemeProvider>
          <div>
            <Popup/>
            <RaisedButton label="Log Out" secondary={true} style={style} style={{float: 'right'}}/>
          <h3><u>Account</u></h3><br></br>
            <h4 style={{textAlign:'right', marginRight:'50px'}}>
            Level <em>{this.state.userInfo.level}</em>
            </h4>
            <img src={this.state.userInfo.avatar}/>
          <ul style={{float: 'right', marginRight: '100px', listStyle: 'none', border: '1px solid black'}}>
              <li>
                <strong>First Name</strong> {this.state.userInfo.firstName}
              </li>
              <li>
                <strong>Last Name</strong> {this.state.userInfo.lastName}
              </li>
              <li>
                <strong>Email</strong> {this.state.userInfo.email}
              </li><li>
                <strong>Password</strong> {this.state.userInfo.password}
              </li>
              <RaisedButton label="Edit" style={style} onClick={this.handleEditClick}/>
            </ul>
            <br></br>
          <RaisedButton label="Change Avatar" style={style} onClick={this.handleChangeAvatar}/>
        <RaisedButton label="Delete Account" secondary={true} style={style} style={{backgroundColor: '#F44336', float: 'right', marginRight: '100px'}} onClick={this.handleDeleteAccountClick}/>
        </div>
      </MuiThemeProvider>}
    </div>
      );
    }
};

export default Account;
