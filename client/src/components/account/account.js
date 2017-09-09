import React from 'react';
import NewAvatar from './NewAvatar.js';
import $ from 'jquery';
import EditAccount from './EditAccount.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
      level: '1'
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
  //{id: 3, first: "Matt", last: "Palamos", display: "Matt Palamos", email: "cki.matt@gmail.com", …}


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
        level: '1'
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
          <div>
            <RaisedButton href='/' label="Log Out" secondary={true} className={accountStyle.logoutButton} onClick={this.handleLogoutClick}/><br></br><br></br><br></br>
            <h4 className={accountStyle.levelText}>
            Level {this.state.level}
            </h4>
            <img src={this.state.avatar}/>
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
                <strong>Username</strong>  {this.state.username} <RaisedButton label="Edit Username" onClick={this.handleEditClick}/>
              </li>
            </ul>
            <br></br>
            <RaisedButton label="Change Avatar" onClick={this.handleChangeAvatar} className={accountStyle.changeAvatarButton}/>
            <div>
              <RaisedButton label="Delete Account" secondary={true} className={accountStyle.deleteAccountButton} onClick={this.handleOpen} />
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
