import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import newAvatarStyle from '../../../../styles/account/newAvatar.css';
import Request from '../../../../helpers/requests';




class NewAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarChoice: {},
      clicked: false,
      currentChoice: '',
      id: ''
    };
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      currentChoice: this.props.currentAvatar
    });
  }

  handleAvatarClick(tile) {
    this.setState({
      avatarChoice: tile,
      currentChoice: tile.img
    });
  }

  handleSubmitClick () {
    Request.post('/updateAvatar', {
      avatar: this.state.avatarChoice.img,
      id: this.props.id
    }, () => {
      this.props.backToMainFromAvatar(this.state.avatarChoice.img);
    });
  }


  render() {

    let clicked = this.state.clicked;
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        cursor: 'pointer',
      },
      titleStyle: {
        color: 'rgb(0, 188, 212)',
      },
    };
    const tilesData = [
      {
        img: 'http://i.imgur.com/sDumOv4.png',
        title: 'Pick Me!',
        author: 'jill111',
      },
      {
        img: 'http://i.imgur.com/ew2LXfi.png',
        title: 'Pick Me!',
        author: 'pashminu',
      },
      {
        img: 'http://i.imgur.com/ySFaL6P.png',
        title: 'Pick Me!',
        author: 'Danson67',
      },
      {
        img: 'http://i.imgur.com/8jgFRP1.png',
        title: 'Pick Me!',
        author: 'fancycrave1',
      },
      {
        img: 'http://i.imgur.com/7oyODCg.png',
        title: 'Pick Me!',
        author: 'Hans',
      },
    ];

    return (
      <MuiThemeProvider>
        <div style={styles.root}><br></br>
          <h3><u>Change Avatar</u></h3><br></br>
          <RaisedButton label="Back to Account" className={newAvatarStyle.backToAccountButton}onClick={this.props.backToMain}/>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile, index) => (
              <GridTile
                key={index}
                title={tile.title}
                titleStyle={styles.titleStyle}
                onClick={this.handleAvatarClick.bind(this, tile)}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                <img src={tile.img} />
              </GridTile>
            // }
            ))}
          </GridList>
          <img src={this.state.currentChoice} className={newAvatarStyle.currentAvatarChoice}/> <br></br>
          <RaisedButton label="Submit" className={newAvatarStyle.buttonStyle} onClick={this.handleSubmitClick}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NewAvatar;
