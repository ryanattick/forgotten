import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import Popup, { P } from 'react-popup-master';



const style = {
  margin: 10,
};

const Account = (props) => {

  // handleChangeAvatar = () => {
  //   P.confirm({
  //     message: 'Does this work??',
  //     option: [ {
  //         text: 'Close'
  //     }]
  //   });
  // }

  return (
    <MuiThemeProvider>
      <div>
        <RaisedButton label="Log Out" secondary={true} style={style} style={{float: 'right'}}/>
      <h3 style={{}}><u>Account</u></h3><br></br>
        <h4 style={{textAlign:'right', marginRight:'50px'}}>
        Level
        </h4>
        <img src='http://i.imgur.com/8jgFRP1.png'/>
      <ul style={{float: 'right', marginRight: '100px', listStyle: 'none'}}>
          <li>
            Name  <RaisedButton label="Change Name" style={style} />

          </li>
          <li>
            Email  <RaisedButton label="Change Email" style={style} />
          </li><li>
            Password <RaisedButton label="Change Password" style={style} />
          </li>
        </ul>
        <br></br>
      <RaisedButton label="Change Avatar" style={style} />
    <RaisedButton label="Delete Account" secondary={true} style={style} style={{backgroundColor: '#F44336', float: 'right', marginRight: '100px'}}/>
    </div>
  </MuiThemeProvider>
  );
};

export default Account;
