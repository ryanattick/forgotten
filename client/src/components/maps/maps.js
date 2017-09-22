import React from 'react';
import Map from './map.js';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Request from '../../../../helpers/requests';
import $ from 'jquery';

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: ['0', '1', '2', '3'],
      incompleteLevels: ['1', '2', '3'],
      completedLevels: [],
      currentLevel: '0',
      completedLevelClicked: null,
      currentlyPlaying: '0',
      currentPuzzleNum: '0',
      lives: 5,
      levelClicked: false,
      levelOpen: false,
      finishedMapOpen: false,
      firstMapOpen: false,
      notificationOpen: false,
      comingSoonOpen: false
    };
  }

  componentWillMount() {
    this.updateCurrentPuzzle();
  }

  updateCurrentPuzzle() {
    Request.get('/mapsData', (data) => {
      var currentLevel;
      if (data.level < 10) {
        currentLevel = '0';
      } else {
        currentLevel = data.level.toString()[0];
      }
      this.setState({
        currentLevel: currentLevel,
        currentPuzzleNum: data.level,
        lives: data.lives
      }, () => {
        this.addBorder();
      });
    });
  }

  componentDidMount() {
    // this.addBorder();
  }

  handleLevelClick(e, currentLevel) {
    if ((e.target.id === this.state.currentLevel && this.state.currentLevel > 1) || (e.target.id === '3' && this.state.currentLevel > 1)) {
      this.handleComingSoonOpen();
    } else if (e.target.id === this.state.currentLevel) {
      this.setState({
        currentLevel: e.target.id,
        levelClicked: true,
        currentlyPlaying: e.target.id
      });
    } else if (currentLevel) {
      this.setState({
        levelClicked: true,
        currentlyPlaying: currentLevel
      });
    } else if (e.target.id < this.state.currentLevel) {
      this.setState({
        completedLevelClicked: e.target.id,
        levelClicked: true,
        currentlyPlaying: e.target.id
      });
    } else {
      this.handleLevelOpen();
    }
  }

  handleReturnToMapsClick() {
    this.setState({
      completedLevelClicked: null,
      levelClicked: false
    }, () => {
      this.addBorder();
    });
    this.updateCurrentPuzzle();
  }

  addBorder() {
    var highlighted = document.getElementById('Grid' + this.state.currentLevel);
    highlighted.style.borderColor = '#44BBA4';
  }

  handleMapFinished() {
    if (this.state.currentLevel === this.state.currentlyPlaying && parseInt(this.state.currentLevel) < 2) {
      this.state.completedLevels.push(this.state.currentLevel);
      this.setState({
        levelClicked: false,
        completedLevelClicked: null,
        currentLevel: JSON.stringify(parseInt(this.state.currentLevel) + 1),
        incompleteLevels: this.state.incompleteLevels.slice(1)
      }, () => {
        this.addBorder();

      });
      this.handleFinishedMapOpen();
      this.updateCurrentPuzzle();
    } else {
      this.setState({
        levelClicked: false,
        completedLevelClicked: null
      }, () => {
        this.addBorder();
      });
    }
    clearInterval(interval);
  }

  checkForFinalLevelItems() {
    this.handleNotificationOpen();
  }

  handleLevelOpen() {
    this.setState({levelOpen: true});
  }

  handleLevelClose() {
    this.setState({levelOpen: false});
  }

  handleMoveToCurrentLevel(e) {
    this.setState({levelOpen: false});
    this.handleLevelClick(e, this.state.currentLevel);
  }

  handleFinishedMapOpen() {
    this.setState({finishedMapOpen: true});
  }

  handleFinishedMapClose() {
    this.setState({finishedMapOpen: false});
  }

  handleFirstMapOpen() {
    this.setState({firstMapOpen: true});
  }

  handleFirstMapClose() {
    this.setState({firstMapOpen: false});
  }

  handleNotificationOpen() {
    this.setState({notificationOpen: true});
  }

  handleNotificationClose() {
    this.setState({notificationOpen: false});
  }

  handleComingSoonOpen() {
    this.setState({comingSoonOpen: true});
  }

  handleComingSoonClose() {
    this.setState({comingSoonOpen: false});
  }

  render() {
    const tilesData = [
      {
        img: '/assets/maps/map1.jpg'
      },
      {
        img: '/assets/maps/map2.jpg'
      },
      {
        img: '/assets/maps/map3.jpg'
      },
      {
        img: '/assets/maps/map4.jpg'
      }
    ];

    const levelActions = [
      <FlatButton
        label={`Go to map ${parseInt(this.state.currentLevel) + 1}`}
        primary={true}
        style={{color:'#E94F37'}}
        onClick={this.handleMoveToCurrentLevel.bind(this)}
      />,
      <FlatButton
        label="Return to Maps"
        keyboardFocused={true}
        primary={true}
        style={{color:'#E94F37'}}
        onClick={this.handleLevelClose.bind(this)}
      />
    ];
    const finishedMapActions = [
      <RaisedButton
        label="Ok"
        backgroundColor='#E94F37'
        labelColor='#F6F7EB'
        // primary={true}
        onClick={this.handleFinishedMapClose.bind(this)}
        backgroundColor='#E94F37'
        labelColor='#F6F7EB'
        // primary={true}
        onClick={this.handleFinishedMapClose.bind(this)}
      />
    ];
    const comingSoonActions = [
      <RaisedButton
        label="Ok"
        primary={true}
        onClick={this.handleComingSoonClose.bind(this)}
      />
    ];
    const initialMapsActions = [
      <RaisedButton
        label="Continue to Maps"
        primary={true}
        onClick={this.handleFirstMapClose.bind(this)}
      />
    ];

    if (!this.state.levelClicked) {
      return (
        <div>
          <div>
            <Dialog
              actions={finishedMapActions}
              modal={false}
              open={this.state.finishedMapOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleFinishedMapClose.bind(this)}
              contentStyle={{textAlign: 'center'}}
              actionsContainerStyle={{textAlign: 'center'}}
            >
              {`Congratulations, you have finished Map ${parseInt(this.state.currentLevel)}!`}
            </Dialog>
          </div>
          <div>
            <Dialog
              actions={comingSoonActions}
              modal={false}
              open={this.state.comingSoonOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleComingSoonClose.bind(this)}
            >
              <b>More Maps Coming Soon!</b>
            </Dialog>
          </div>
          <div>
            <Dialog
              actions={initialMapsActions}
              modal={false}
              open={this.state.firstMapOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleFirstMapClose.bind(this)}
            >
              Game intro here
            </Dialog>
          </div>
          <GridList
            cellHeight={600}
            cols={4}>
            {this.state.levels.map((item, id) => (
              <GridTile
                key={id}
                style={{height: '100%', borderStyle: 'solid', borderColor: '#393E41', fontFamily: 'Exo Light'}}
                id={'Grid' + id}
                title={`MAP ${JSON.stringify(parseInt(item) + 1)}`}
                actionIcon={<IconButton id={id} onClick={(e) => this.handleLevelClick(e)}></IconButton>}>
                <img id={id} onClick={(e) => this.handleLevelClick(e)} style={{cursor: 'pointer'}} src={tilesData[id].img}/>
              </GridTile>
            ))}
          </GridList>
          <div>
            <Dialog
              actions={levelActions}
              modal={false}
              open={this.state.levelOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleLevelClose.bind(this)}
              contentStyle={{textAlign: 'center'}}
              actionsContainerStyle={{textAlign: 'center'}}
            >
              <b>{`Complete Map ${JSON.stringify(parseInt(this.state.currentLevel) + 1)} before moving on!`}</b>
            </Dialog>
          </div>
          <Snackbar
            bodyStyle={{backgroundColor: '#44BBA4'}}
            open={this.state.notificationOpen}
            message="Item added to your backpack"
            autoHideDuration={3000}
            onRequestClose={this.handleNotificationClose.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Map handleBadgeChange={this.props.handleBadgeChange}
            avatar={this.props.avatar}
            handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} checkForFinalLevelItems={this.checkForFinalLevelItems.bind(this)} lives={this.state.lives} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum} map={this.state.currentlyPlaying}/>
        </div>
      );
    }
  }
}

export default Maps;
