import React from 'react';
import $ from 'jquery';
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
  };

  handleUsernameSubmitClick () {
    Request.post('/updateUsername', {
      username: this.state.usernameTextField,
      id: this.props.userId
    }, () => {
      this.props.backToMainFromUsername(this.state.usernameTextField)
    });
  };



  //thesis_devel=# INSERT INTO items (name, description, img_url, puzzle_id, equipped)              VALUES ('Blue Pill', 'Consuming this pill increases the timer on the next quest by 30 seconds', /assets/items/paper.jpg', null, Not Possible');

  render() {
  return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label="Back to Account" onClick={this.props.backToMain}/>
          <h3><u>Edit Account</u></h3><br></br>
          <form>
            <TextField
              hintText="New Username"
              floatingLabelText={this.state.username}
              value={this.state.usernameTextField}
              onChange={this.handleUsernameTextFieldChange}
            /><br />
          <RaisedButton label="Submit Changes" onClick={this.handleUsernameSubmitClick}/>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default EditAccount;
