import React from 'react';
import NewAvatar from './newAvatar.js';
import $ from 'jquery';
import EditAccount from './EditAccount.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { GridTile } from 'material-ui/GridList';
import accountStyle from '../../../../styles/account/account.css';



class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
      open: false,
      id: '',
      avatar: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      level: ''
    }; //replace with data
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteAccountClick = this.handleDeleteAccountClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.backToMainFromAvatar = this.backToMainFromAvatar.bind(this);
    this.backToMainFromUsername = this.backToMainFromUsername.bind(this);
    this.backToMain = this.backToMain.bind(this);
  }

  componentWillMount () {
    $.get('/userInfo', (data) => {
      this.setState({
        id: data.id,
        firstName: data.first,
        lastName: data.last,
        display: data.display,
        email: data.email,
        avatar: data.avatar,
        username: data.username,
        level: data.level
      });
    });
  } //once backend is connected

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  handleChangeAvatar () {
    this.setState({
      page: 'avatar'
    });
  }


  handleEditClick () {
    this.setState({
      page: 'edit'
    });
  }

  handleDeleteAccountClick () {
    // $.post('/deleteUser', {id: this.state.userInfo.id}, (data) => {
    //   console.log(data, 'Account delete success.')
    // });
    console.log('DELETED');
    this.handleClose();
  }

  backToMain () {
    this.setState({
      page: 'main'
    });
  }

  backToMainFromAvatar (avatar) {
    this.setState({
      page: 'main',
      avatar: avatar
    });
  }

  backToMainFromUsername (username) {
    this.setState({
      page: 'main',
      username: username
    });
  }

  handleLogoutClick () {
    $.get('/logout');
  }



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
          <EditAccount backToMainFromUsername={this.backToMainFromUsername} backToMain={this.backToMain} userId={this.state.id} username={this.state.username} />
        }
        {currentPage === 'avatar' &&
          <NewAvatar backToMainFromAvatar={this.backToMainFromAvatar}
            backToMain={this.backToMain} currentAvatar={this.state.avatar} id={this.state.id}/>
        }
        {currentPage === 'main' &&
        <MuiThemeProvider>
          <div className={accountStyle.flexContainer}>
            <GridTile style={{backgroundImage: `url(${this.state.avatar})`, backgroundSize: 'cover', height: '175px', width: '175px', border: 'none'}}
            ><IconButton tooltip='Change Avatar' tooltipPosition='bottom-right' onClick={this.handleChangeAvatar}><SettingsIcon color="black" /></IconButton></GridTile>
            <h4>
            Level {this.state.level}
            </h4>
            <ul className={accountStyle.userInfo}>
              <li className={accountStyle.text}>
                <strong>First Name</strong>  {this.state.firstName}
              </li>
              <li className={accountStyle.text}>
                <strong>Last Name</strong>  {this.state.lastName}
              </li>
              <li className={accountStyle.text}>
                <strong>Email</strong>  {this.state.email}
              </li>
              <li className={accountStyle.text}>
                <span
                ><strong>Username</strong> {this.state.username} <IconButton tooltip='Change Username' tooltipPosition='bottom-left' onClick={this.handleEditClick}><SettingsIcon color="black" /></IconButton></span>
              </li>
            </ul>
            <br></br>
            <div>
              <RaisedButton href='/' label="Log Out" secondary={true} className={accountStyle.logoutButton} onClick={this.handleLogoutClick}/>
              <RaisedButton label="Delete Account" secondary={true} onClick={this.handleOpen} />
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
}

export default Account;
