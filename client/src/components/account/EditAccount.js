import React from 'react';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 10,
};


class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      firstNameTextField: '',
      lastNameTextField: '',
      emailTextField: '',
      passwordTextField: ''
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleFirstNameTextFieldChange = this.handleFirstNameTextFieldChange.bind(this);
    this.handleLastNameTextFieldChange = this.handleLastNameTextFieldChange.bind(this);
    this.handleEmailTextFieldChange = this.handleEmailTextFieldChange.bind(this);
    this.handlePasswordTextFieldChange = this.handlePasswordTextFieldChange.bind(this);
  }

componentWillMount () {
  this.setState({
    userInfo: this.props.userInfo
  });
};

handleFirstNameTextFieldChange (e) {
  this.setState({
    firstNameTextField: e.target.value
  });
}

handleLastNameTextFieldChange (e) {
  this.setState({
    lastNameTextField: e.target.value
  });
}

handleEmailTextFieldChange (e) {
  this.setState({
    emailTextField: e.target.value
  });
}

handlePasswordTextFieldChange (e) {
  this.setState({
    passwordTextField: e.target.value
  });
}

handleSubmitClick () {
  if (this.state.firstNameTextField !== '') {
    // $.post('/updateFirstName', {firstName: this.state.firstNameTextField}, (data) => {
    //   console.log(data, 'First name update success');
    // });
    console.log(this.state.firstNameTextField);
  };
  if (this.state.lastNameTextField !== '') {
    // $.post('/updateLastName', {lastName: this.state.lastNameTextField}, (data) => {
    //   console.log(data, 'Last name update success');
    // });
    console.log(this.state.lastNameTextField);
  };
  if (this.state.emailTextField !== '') {
    // $.post('/updateEmail', {email: this.state.emailTextField}, () => {
    //   console.log(data, 'Email update success');
    // });
    console.log(this.state.emailTextField);
  };
  if (this.state.passwordTextField !== '') {
    // $.post('/updatePassword', {password: this.state.passwordTextField}, () => {
    //   console.log(data, 'Email update succss');
    // });
    console.log(this.state.passwordTextField);
  }; 
};


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h3><u>Edit Account</u></h3><br></br>
          <form>
            <TextField
              hintText="First Name"
              floatingLabelText={this.state.userInfo.firstName}
              value={this.state.firstNameTextField}
              onChange={this.handleFirstNameTextFieldChange}
            /><br />
            <TextField
              hintText="Last Name"
              floatingLabelText={this.state.userInfo.lastName}
              value={this.state.lastNameTextField}
              onChange={this.handleLastNameTextFieldChange}
            /><br />
            <TextField
              hintText="Email"
              floatingLabelText={this.state.userInfo.email}
              value={this.state.emailTextField}
              onChange={this.handleEmailTextFieldChange}
            /><br />
            <TextField
              hintText="Password"
              floatingLabelText={this.state.userInfo.password}
              value={this.state.passwordTextField}
              onChange={this.handlePasswordTextFieldChange}
            /><br />
          <RaisedButton label="Submit Changes" style={style} onClick={this.handleSubmitClick}/>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default EditAccount;
