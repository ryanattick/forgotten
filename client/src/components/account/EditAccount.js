
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import editAccountStyle from '../../../../styles/account/editAccount.css';
import Request from '../../../../helpers/requests';



class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameTextField: '',
      id: ''
    };

    this.handleUsernameSubmitClick = this.handleUsernameSubmitClick.bind(this);
    this.handleUsernameTextFieldChange = this.handleUsernameTextFieldChange.bind(this);
  }

  componentWillMount () {
    this.setState({
      id: this.props.userId,
      username: this.props.username
    });
  }


  handleUsernameTextFieldChange (e) {
    this.setState({
      usernameTextField: e.target.value
    });
  }

  handleUsernameSubmitClick () {
    Request.post('/updateUsername', {
      username: this.state.usernameTextField,
      id: this.props.userId
    }, () => {
      this.props.backToMainFromUsername(this.state.usernameTextField);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={editAccountStyle.flexContainer}>
          <div className={editAccountStyle.innerFlexContainer}>
            <form>
              <TextField
                hintText="New Username"
                floatingLabelText={this.state.username}
                value={this.state.usernameTextField}
                onChange={this.handleUsernameTextFieldChange}
                floatingLabelStyle={{color: '#393E41'}}
                underlineFocusStyle={{borderColor: 'red'}}
              /><br />
              <RaisedButton label="Submit Changes" onClick={this.handleUsernameSubmitClick} backgroundColor='#E94F37' labelColor='#F6F7EB' className={editAccountStyle.button}/> <br></br>
              <RaisedButton label="Back to Account" onClick={this.props.backToMain} backgroundColor='#E94F37' labelColor='#F6F7EB' className={editAccountStyle.button}/>
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default EditAccount;