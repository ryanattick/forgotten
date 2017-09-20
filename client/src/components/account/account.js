import React from 'react';
import NewAvatar from './newAvatar.js';
import EditAccount from './EditAccount.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { GridTile } from 'material-ui/GridList';
import accountStyle from '../../../../styles/account/account.css';
import Request from '../../../../helpers/requests';



class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
      open: false,
      id: '',
      avatar: 'https://i.imgur.com/sZwuwPk.png',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      level: '',
      musicMuted: this.props.musicMuted
    };
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteAccountClick = this.handleDeleteAccountClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.backToMainFromAvatar = this.backToMainFromAvatar.bind(this);
    this.backToMainFromUsername = this.backToMainFromUsername.bind(this);
    this.backToMain = this.backToMain.bind(this);
    this.handleAudioClick = this.handleAudioClick.bind(this);
  }


  componentWillMount () {
    Request.get('/userInfo', (data) => {
      if (data.username === null) {
        data.username = 'Choose a username';
      }
      if (data.avatar === null) {
        data.avatar = 'https://i.imgur.com/sZwuwPk.png';
      }
      this.setState({
        id: data.id,
        firstName: data.first,
        lastName: data.last,
        display: data.display,
        email: data.email,
        avatar: data.avatar,
        username: data.username,
        level: data.level + 1
      });
    });
  }

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
    Request.post('/deleteUser', {id: this.state.id}, (data) => {
      console.log(data, 'Account delete success.');
      window.location.reload(true);
    });
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
    Request.get('/logout', (data) => {
      console.log('Log Out successful');
    });
  }

  handleAudioClick () {
    Promise.resolve(this.props.handleMuteToggle())
    .then(() => {
      this.setState({
        musicMuted: this.props.musicMuted
      });
    });
  }




  render() {

    let currentPage = this.state.page;
    let audioButton = this.state.musicMuted ? <RaisedButton label="Unmute Audio" onClick={this.handleAudioClick}/> : <RaisedButton label="Mute Audio" onClick={this.handleAudioClick}/>;
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
            <div className={accountStyle.innerFlexContainer}>
              <GridTile style={{backgroundImage: `url(${this.state.avatar})`, backgroundSize: 'cover', height: '150px', width: '150px', border: 'none', borderRadius: '2px'}}
              ><IconButton tooltip='Change Avatar' tooltipPosition='bottom-right' onClick={this.handleChangeAvatar}><SettingsIcon color="rgba(57, 62, 65, 0.55)" /></IconButton></GridTile>
              <h4 className={accountStyle.level}>
              Level {this.state.level}
              </h4>
              <span className={accountStyle.label} style={{marginLeft: '30px'}}>Username<IconButton tooltip='Change Username' tooltipPosition='bottom-left' onClick={this.handleEditClick}><SettingsIcon color="rgba(57, 62, 65, 0.55)" /></IconButton></span> <span className={accountStyle.text}>{this.state.username}</span>
              <span className={accountStyle.label}>Name</span> <span className={accountStyle.text}>{this.state.firstName + ' ' + this.state.lastName}</span>
              <span className={accountStyle.label}>Email</span> <span className={accountStyle.text}>{this.state.email}</span>
              {audioButton}
              <RaisedButton href='/' label="Log Out" backgroundColor='#E94F37' labelColor='#F6F7EB' style={{width: '160px'}} className={accountStyle.logoutButton} onClick={this.handleLogoutClick}/>
              <RaisedButton label="Delete Account" backgroundColor='#E94F37' labelColor='#F6F7EB' onClick={this.handleOpen} />
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
