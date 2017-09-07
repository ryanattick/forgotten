import React from 'react';
import Map1 from './map1.js';
import Map2 from './map2.js';
import Map3 from './map3.js';
import Map4 from './map4.js';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

const tilesData = [
  {
    img: '/assets/maps/basement.jpg'
  },
  {
    img: '/assets/maps/abandonedChurch.jpg'
  },
  {
    img: '/assets/maps/level3.jpg'
  },
  {
    img: '/assets/maps/level4.jpg'
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
      finishedMapOpen: false
    };
  }

  componentWillMount() {
    // $.get({
    //   url: '/mapsData',
    //   success: (data) => {
    //     var currentLevel;
    //     if (data < 10) {
    //       currentLevel = '0';
    //     } else {
    //       currentLevel = data.toString()[0];
    //     }
    //     this.setState({
    //       currentLevel: currentLevel,
    //       currentPuzzleNum: data
    //     }, () => {
    //       this.addBorder();
    //     });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }

  componentDidMount() {
    this.addBorder();
  }

  handleLevelClick(e) {
    if (e.target.id === this.state.currentLevel) {
      this.setState({
        currentLevel: e.target.id,
        levelClicked: true,
        currentlyPlaying: e.target.id
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
  }

  addBorder() {
    var highlighted = document.getElementById('Grid' + this.state.currentLevel);
    var parent = $(highlighted).parent()[0];
    parent.style.borderStyle = 'solid';
    parent.style.borderColor = 'green';
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
  handleFinishedMapOpen() {
    this.setState({finishedMapOpen: true});
  }

  handleFinishedMapClose() {
    this.setState({finishedMapOpen: false});
  }

  render() {
    const levelActions = [
      <RaisedButton
        label="Ok"
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

    if (!this.state.levelClicked) {
      return (
        <div>
          <div>
            <Dialog
              actions={finishedMapActions}
              modal={false}
              open={this.state.finishedMapOpen}
              onRequestClose={this.handleFinishedMapClose.bind(this)}
            >
              {`you have finished the map`}
            </Dialog>
          </div>
          <GridList
            cellHeight={180}
            cols={4}>
            {this.state.levels.map((item, id) => (
              <GridTile
                key={id}
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
              onRequestClose={this.handleLevelClose.bind(this)}
            >
              <b>{`Complete Level ${JSON.stringify(parseInt(this.state.currentLevel) + 1)} before moving on!`}</b>
            </Dialog>
          </div>
        </div>
      );
    } else if (this.state.currentLevel === '0' || this.state.completedLevelClicked === '0') {
      return (
        <div>
          <Map1 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum}/>
        </div>
      );
    } else if (this.state.currentLevel === '1' || this.state.completedLevelClicked === '1') {
      return (
        <div>
          <Map2 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum}/>
        </div>
      );
    } else if (this.state.currentLevel === '2' || this.state.completedLevelClicked === '2') {
      return (
        <div>
          <Map3 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum}/>
        </div>
      );
    } else if (this.state.currentLevel === '3' || this.state.completedLevelClicked === '3') {
      return (
        <div>
          <Map4 handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)} handleMapFinished={this.handleMapFinished.bind(this)} level={this.state.currentLevel} currentPuzzleNum={this.state.currentPuzzleNum}/>
        </div>
      );
    }
  }
}

export default Maps;
