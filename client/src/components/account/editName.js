
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import editAccountStyle from '../../../../styles/account/editAccount.css';
import Request from '../../../../helpers/requests';



class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      firstNameTextField: '',
      lastNameTextField: '',
      id: ''
    };

    this.handleNameSubmitClick = this.handleNameSubmitClick.bind(this);
    this.handleFirstNameTextFieldChange = this.handleFirstNameTextFieldChange.bind(this);
    this.handleLastNameTextFieldChange = this.handleLastNameTextFieldChange.bind(this);
  }

  componentWillMount () {
    this.setState({
      id: this.props.userId,
      firstName: this.props.firstName,
      lastName: this.props.lastName
    });
  }


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

  handleNameSubmitClick () {
    Request.post('/updateName', {
      firstName: this.state.firstNameTextField,
      lastName: this.state.lastNameTextField,
      id: this.props.userId
    }, () => {
      this.props.backToMainFromName({firstName: this.state.firstNameTextField, lastName: this.state.lastNameTextField});
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={editAccountStyle.flexContainer}>
          <div className={editAccountStyle.innerFlexContainer}>
            <form>
              <TextField
                hintText="First Name"
                floatingLabelText={this.state.firstName}
                value={this.state.firstNameTextField}
                onChange={this.handleFirstNameTextFieldChange}
                floatingLabelStyle={{color: '#393E41'}}
                underlineFocusStyle={{borderColor: 'red'}}
              /><br />
              <TextField
                hintText="Last Name"
                floatingLabelText={this.state.lastName}
                value={this.state.lastNameTextField}
                onChange={this.handleLastNameTextFieldChange}
                floatingLabelStyle={{color: '#393E41'}}
                underlineFocusStyle={{borderColor: 'red'}}
              /><br />
              <RaisedButton label="Submit Changes" onClick={this.handleNameSubmitClick} backgroundColor='#E94F37' labelColor='#F6F7EB' className={editAccountStyle.button}/> <br></br>
              <RaisedButton label="Back to Account" onClick={this.props.backToMain} backgroundColor='#E94F37' labelColor='#F6F7EB' className={editAccountStyle.button}/>
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default EditName;
