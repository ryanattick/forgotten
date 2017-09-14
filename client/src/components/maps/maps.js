import React from 'react';
import Map1 from './map1.js';
import Map2 from './map2.js';
import Map3 from './map3.js';
import Map4 from './map4.js';
import Map from './map.js';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Request from '../../../../helpers/requests';
import $ from 'jquery';

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
      levelClicked: false,
      levelOpen: false,
      finishedMapOpen: false,
      firstMapOpen: false
    };
  }

  componentWillMount() {
    this.updateCurrentPuzzle();
    // if (this.state.currentLevel === '0') {
    //   this.handleFirstMapOpen();
    // }
  }

  updateCurrentPuzzle() {
    Request.get('/mapsData', (data) => {
      var currentLevel;
      if (data < 10) {
        currentLevel = '0';
      } else {
        currentLevel = data.toString()[0];
      }
      this.setState({
        currentLevel: currentLevel,
        currentPuzzleNum: data
      }, () => {
        this.addBorder();
      });
    });
  }

  componentDidMount() {
    // this.addBorder();
  }

  handleLevelClick(e, currentLevel) {
    if (e.target.id === this.state.currentLevel) {
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
    if (this.state.currentLevel === this.state.currentlyPlaying) {
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

  render() {
    const levelActions = [
      <FlatButton
        label={`Go to level ${parseInt(this.state.currentLevel) + 1}`}
        primary={true}
        onClick={this.handleMoveToCurrentLevel.bind(this)}
      />,
      <FlatButton
        label="Return to Maps"
        primary={true}
        onClick={this.handleLevelClose.bind(this)}
      />
    ];
    const finishedMapActions = [
      <RaisedButton
        label="Ok"
        primary={true}
        onClick={this.handleFinishedMapClose.bind(this)}
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
            >
              {`you have finished the map`}
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
                style={{height: '100%', borderStyle: 'solid', borderColor: '#393E41'}}
                id={'Grid' + id}
                title={`Level ${JSON.stringify(parseInt(item) + 1)}`}
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
            >
              <b>{`Complete Level ${JSON.stringify(parseInt(this.state.currentLevel) + 1)} before moving on!`}</b>
            </Dialog>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Map handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum} map={this.state.currentlyPlaying}/>
        </div>
      );
    }
  }
  //   } else if (this.state.currentLevel === '0' || this.state.completedLevelClicked === '0') {
  //     return (
  //       <div>
  //         <Map1 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum} map={this.state.currentlyPlaying}/>
  //       </div>
  //     );
  //   } else if (this.state.currentLevel === '1' || this.state.completedLevelClicked === '1') {
  //     return (
  //       <div>
  //         <Map2 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum} map={this.state.currentlyPlaying}/>
  //       </div>
  //     );
  //   } else if (this.state.currentLevel === '2' || this.state.completedLevelClicked === '2') {
  //     return (
  //       <div>
  //         <Map3 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum} map={this.state.currentlyPlaying}/>
  //       </div>
  //     );
  //   } else if (this.state.currentLevel === '3' || this.state.completedLevelClicked === '3') {
  //     return (
  //       <div>
  //         <Map4 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum} map={this.state.currentlyPlaying}/>
  //       </div>
  //     );
  //   }
  // }
}

export default Maps;
