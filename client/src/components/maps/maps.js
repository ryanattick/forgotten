import React from 'react';
import Map from './map.js';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import $ from 'jquery';

// TODO: make only current level and completed levels clickable
// TODO: update colors to signify which levels can be clicked

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: ['1'],
      incomleteLevels: ['Level One'],
      completedLevels:[],
      currentLevel: '1',
      levelClicked: false
    };
  }

  componentWillMount() {
    //get current level from db
    // $.get({
    //   url: '/mapsData',
    //   success: function(data) {
    //     //set state with data retrieved
    //     //incomleteLevels, completedLevels, currentLevel
    //   },
    //   error: function(err) {
    //     console.log(err);
    //   }
    // });
  }

  handleLevelClick(e) {
    this.setState({
      currentLevel: e.target.id,
      levelClicked: true,
    });
  }

  handleReturnToMapsClick() {
    this.setState({
      levelClicked: false
    });
  }

  render() {
    if (!this.state.levelClicked) {
      return (
        <div>
          <GridList
            cellHeight={180}
            cols={4}
            padding={50}>
            {this.state.levels.map((item, id) => (
              <GridTile
                key={id}
                title={`Level ${item}`}
                actionIcon={<IconButton id={id + 1} onClick={(e) => this.handleLevelClick(e)}></IconButton>}>
              </GridTile>
            ))}
          </GridList>
        </div>
      );
    } else {
      return (
        <div>
          <div></div>
          <Map handleReturnToMapsClick={this.handleReturnToMapsClick.bind(this)}/>
        </div>
      );
    }
  }
}

export default Maps;
