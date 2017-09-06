import React from 'react';
import NewAvatar from './NewAvatar.js';
import $ from 'jquery';
import EditAccount from './EditAccount.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import accountStyle from '../../../../styles/account/account.css';


import Popup, { P } from 'react-popup-master';


const style = {
  margin: 10,
};


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
      open: false,
      userInfo: {
        id: 1,
        avatar: 'http://i.imgur.com/8jgFRP1.png',
        firstName: 'Ryan',
        lastName: 'Attick',
        email: 'whatever@gmail.com',
        username: 'ryanattick',
        password: 'password',
        level: '9'
      } //replace with data from database
    }
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteAccountClick = this.handleDeleteAccountClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // componentWillMount () {
  //   $.get('/userInfo', (userInfo) => {
  //     this.setState({
  //       userInfo: userInfo
  //     });
  //   });
  // }; //once backend is connected

  handleOpen () {
   this.setState({open: true});
 };

 handleClose () {
   this.setState({open: false});
 };

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
    console.log('DELETED');
    this.handleClose();
  };

  handleLogoutClick () {
    $.get('/logout');
  };



  render() {

  let currentPage = this.state.page;

  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleClose}
    />,
    <FlatButton
      label="Delete"
      primary={true}
      keyboardFocused={true}
      onClick={this.handleDeleteAccountClick}
    />,
  ];


    return (
      <div>
        {currentPage === 'edit' &&
          <EditAccount userInfo={this.state.userInfo}/>
        }
        {currentPage === 'avatar' &&
          <NewAvatar currentAvatar={this.state.userInfo.avatar}/>
        }
        {currentPage === 'main' &&
        <MuiThemeProvider>
          <div>
            <Popup/>
          <RaisedButton href='/' label="Log Out" secondary={true} style={style} style={{float: 'right'}} onClick={this.handleLogoutClick}/>
          <h3><u>Account</u></h3><br></br>
            <h4 style={{textAlign:'right', marginRight:'50px'}}>
            Level <em>{this.state.userInfo.level}</em>
            </h4>
            <img src={this.state.userInfo.avatar}/>
          <ul style={{float: 'right', marginRight: '100px', listStyle: 'none'}}>
              <li className={accountStyle.text}>
                <strong>First Name</strong>  {this.state.userInfo.firstName}
              </li>
              <li className={accountStyle.text}>
                <strong>Last Name</strong>  {this.state.userInfo.lastName}
              </li>
              <li className={accountStyle.text}>
                <strong>Email</strong>  {this.state.userInfo.email}
              </li>
              <li className={accountStyle.text}>
                <strong>Username</strong>  {this.state.userInfo.username} <RaisedButton label="Edit Username" style={style} onClick={this.handleEditClick}/>
              </li>
            </ul>
            <br></br>
          <RaisedButton label="Change Avatar" style={style} onClick={this.handleChangeAvatar}/>
        <div>
      <RaisedButton label="Delete Account" secondary={true} style={style} style={{backgroundColor: '#F44336', float: 'right', marginRight: '100px'}} onClick={this.handleOpen} />
      <Dialog
        title="Delete Account"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Are you sure you want to delete your Forgotten account? If you do, your account cannot be restored.
      </Dialog>
    </div>
        </div>
      </MuiThemeProvider>}
    </div>
      );
    }
};

export default Account;
