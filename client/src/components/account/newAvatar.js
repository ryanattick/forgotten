import React from 'react';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import newAvatarStyle from '../../../../styles/account/NewAvatar.css';


const buttonStyle = {
  marginTop: '100px',
  marginRight: '200px',
  height: '30px',
  float: 'right'
};

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
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    img: 'http://i.imgur.com/sDumOv4.png',
    title: 'Pick Me!1',
    author: 'jill111',
  },
  {
    img: 'http://i.imgur.com/ew2LXfi.png',
    title: 'Pick Me!2',
    author: 'pashminu',
  },
  {
    img: 'http://i.imgur.com/ySFaL6P.png',
    title: 'Pick Me!3',
    author: 'Danson67',
  },
  {
    img: 'http://i.imgur.com/8jgFRP1.png',
    title: 'Pick Me!4',
    author: 'fancycrave1',
  },
  {
    img: 'http://i.imgur.com/7oyODCg.png',
    title: 'Pick Me!5',
    author: 'Hans',
  },
];


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

  // // $.get('/userInfo', (data) => {
  //     console.log(data, data.first);
  //       this.setState({
  //         userInfo: {
  //           firstName: data.first,
  //           lastName: data.last,
  //           display: data.display,
  //           email: data.email
  //         }
  //       })
  //   });

  handleSubmitClick () {
    var postObject = this.state.avatarChoice.img;
    console.log(this.props.id);
    fetch('/updateAvatar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: this.state.avatarChoice.img,
        id: this.props.id
      })
    });
  }

  render() {
    let clicked = this.state.clicked;
    return (
      <MuiThemeProvider>
        <div style={styles.root}><br></br>
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
          <img src={this.state.currentChoice} style={{margin: '50px', border: '3px solid black'}}/> <br></br>
          <RaisedButton label="Submit" style={buttonStyle} onClick={this.handleSubmitClick}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NewAvatar;
