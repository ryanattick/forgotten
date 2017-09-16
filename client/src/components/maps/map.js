import React from 'react';
import Puzzle from './puzzle.js';
import styles from '../../../../styles/maps/map.css';
import $ from 'jquery';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Request from '../../../../helpers/requests';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsRemaining: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      completedQuests: [],
      currentQuest: '0',
      greenclickedQuest: null,
      currentQuestBeforeGreenClick: null,
      clickedQuest: false,
      playerName: '',
      puzzles: {
        questions: {
          '0': 'Question1',
          '1': 'Question2',
          '2': 'Question3',
          '3': 'Question4',
          '4': 'Question5',
          '5': 'Question6',
          '6': 'Question7',
          '7': 'Question8',
          '8': 'Question9',
          '9': 'Question10'
        },
        answers: {
          '0': 'Answer',
          '1': 'Answer',
          '2': 'Answer',
          '3': 'Answer',
          '4': 'Answer',
          '5': 'Answer',
          '6': 'Answer',
          '7': 'Answer',
          '8': 'Answer',
          '9': 'Answer'
        },
        messages: {
          '0': 'Message goes here',
          '1': 'Message goes here',
          '2': 'Message goes here',
          '3': 'Message goes here',
          '4': 'Message goes here',
          '5': 'Message goes here',
          '6': 'Message goes here',
          '7': 'Message goes here',
          '8': 'Message goes here',
          '9': 'Message goes here'
        },
        stories: {
          '0': 'Message goes here1',
          '1': 'Message goes here2',
          '2': 'Message goes here3',
          '3': 'Message goes here4',
          '4': 'Message goes here5',
          '5': 'Message goes here6',
          '6': 'Message goes here7',
          '7': 'Message goes here8',
          '8': 'Message goes here9',
          '9': 'Message goes here10'
        },
        items: {
          '0': null,
          '1': null,
          '2': null,
          '3': null,
          '4': null,
          '5': null,
          '6': null,
          '7': null,
          '8': null,
          '9': null
        }
      },
      messageOpen: false,
      storyOpen: false,
      notificationOpen: false
    };
  }
  componentWillMount() {
    if (this.props.currentPuzzleNum >= parseInt(this.props.map + '0') + 10) {
      this.setState({
        completedQuests: ['0'].concat(this.state.levelsRemaining),
        levelsRemaining: [],
        currentQuest: '10'
      }, () => {
        this.colorPuzzles(true);
      });
    } else if (this.props.currentPuzzleNum !== parseInt(this.props.map + '0')) {
      this.setState({
        currentQuest: this.props.currentPuzzleNum.toString()[1] || this.props.currentPuzzleNum.toString()[0],
        completedQuests: ['0'].concat(this.state.levelsRemaining.slice(0, this.props.currentPuzzleNum - parseInt(this.props.map + '1'))),
        levelsRemaining: this.state.levelsRemaining.slice(this.props.currentPuzzleNum - parseInt(this.props.map + '0'))
      }, () => {
        this.colorPuzzles(true);
      });
    }
    Request.get('/puzzleData', (data) => {
      this.setState({
        puzzles: data.puzzles,
        playerName: data.playerName
      });
    });
  }

  componentDidMount() {
    if (!this.state.completedQuests.length) {
      this.handleStoryOpen();
    }
  }

  colorPuzzles(isMounting) {
    if (isMounting) {
      for (var i = 0; i < this.state.completedQuests.length; i++) {
        document.getElementById(`circle${this.state.completedQuests[i]}`).style.fill = '#44BBA4';
        document.getElementById(`circle${this.state.completedQuests[i]}`).style.display = 'block';
        if (i < 9) {
          document.getElementById(`path${this.state.completedQuests[i]}`).style.display = 'block';
        }
      }
      if (this.state.currentQuest && parseInt(this.state.currentQuest) < 10) {
        document.getElementById(`circle${this.state.currentQuest}`).style.fill = '#E94F37';
        document.getElementById(`circle${this.state.currentQuest}`).style.display = 'block';
      }
    } else {
      for (var i = 0; i < this.state.completedQuests.length; i++) {
        document.getElementById(`circle${this.state.completedQuests[i]}`).style.fill = '#44BBA4';
        document.getElementById(`circle${this.state.completedQuests[i]}`).style.display = 'block';
        if (i !== this.state.completedQuests.length - 1) {
          document.getElementById(`path${this.state.completedQuests[i]}`).style.display = 'block';
        }
      }
      if (this.state.currentQuest && parseInt(this.state.currentQuest) < 10) {
        document.getElementById(`circle${this.state.currentQuest}`).style.fill = '#E94F37';
      }
    }
  }

  handleMapQuestClick(e) {
    if (e.target.style.fill === 'rgb(68, 187, 164)') {
      this.setState({
        greenclickedQuest: e.target.id[e.target.id.length - 1],
        currentQuestBeforeGreenClick: this.state.currentQuest,
        currentQuest: e.target.id[e.target.id.length - 1],
        clickedQuest: true
      });
    } else if (e.target.id === `circle${this.state.currentQuest}`) {
      this.setState({
        clickedQuest: true
      });
    }
  }

  handleReturntoMapClick(onSubmitButton) {
    if (this.state.greenclickedQuest) {
      this.setState({
        greenclickedQuest: null,
        currentQuest: this.state.currentQuestBeforeGreenClick,
        clickedQuest: false
      }, function() {
        this.colorPuzzles(true);
      });
    } else if (onSubmitButton) {
      this.setState({
        clickedQuest: false
      }, function() {
        this.colorPuzzles(true);
      });
    } else {
      this.setState({
        clickedQuest: false
      }, function() {
        this.colorPuzzles();
      });
    }
  }

  handlePuzzleSubmit() {
    var answer = document.getElementById('puzzleAnswer').value;
    if (this.state.puzzles.answers[this.state.currentQuest].toLowerCase() === answer.toLowerCase()) {
      if (this.state.greenclickedQuest) {
        this.setState({
          greenclickedQuest: null,
          currentQuest: this.state.currentQuestBeforeGreenClick
        }, function() {
          this.colorPuzzles();
        });
        this.handleReturntoMapClick();
      } else if (this.state.currentQuest === '9') {
        this.state.completedQuests.push(this.state.currentQuest);
        if (this.checkForItems(this.state.currentQuest)) {
          this.handleNotificationOpen();
        }
        this.setState({
          currentQuest: '10'
        }, function() {
          Promise.resolve(Request.post('/mapData', {level: parseInt(this.props.map + '0') + 10}, (data) => {
          }))
            .then(() => {
              if (this.checkForItems(this.state.completedQuests[this.state.completedQuests.length - 1])) {
                Promise.resolve(this.props.handleMapFinished())
                  .then(() => this.props.checkForFinalLevelItems());
              } else {
                this.props.handleMapFinished();
              }
            });
        });
      } else {
        this.state.completedQuests.push(this.state.currentQuest);
        if (this.checkForItems(this.state.currentQuest)) {
          this.handleNotificationOpen();
        }
        this.setState({
          currentQuest: this.state.levelsRemaining[0],
          levelsRemaining: this.state.levelsRemaining.slice(1)
        }, function() {
          this.colorPuzzles();
          Request.post('/mapData', {level: parseInt(this.props.map + this.state.currentQuest)}, (data) => {
          });
          this.handleMessageOpen();
        });
      }
      if (this.state.levelsRemaining.length !== 0 && !this.state.greenclickedQuest) {
        this.handleReturntoMapClick();
      }
    } else {
      document.getElementById('puzzleAnswer').value = '';
    }
  }

  checkForItems(quest) {
    for (var key in this.state.puzzles.items) {
      if (this.state.puzzles.items[key].puzzleID === parseInt(this.props.map + quest)) {
        return true;
      }
    }
    return false;
  }

  handleEnterClick(e) {
    if (e.keyCode === 13) {
      this.handlePuzzleSubmit();
    }
  }

  handleMessageOpen() {
    this.setState({messageOpen: true});
  }

  handleMessageClose() {
    this.setState({messageOpen: false});
    var path = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}`);
    var circle = $(`#circle${this.state.currentQuest}`);
    circle.add(path).fadeIn(1500);
  }

  handleStoryOpen() {
    this.setState({storyOpen: true});
  }

  handleStoryClose() {
    this.setState({storyOpen: false});
  }

  changeName(text) {
    if (text) {
      return text.replace('[playerName]', this.state.playerName);
    }
  }

  handleNotificationOpen() {
    this.setState({notificationOpen: true});
  }

  handleNotificationClose() {
    this.setState({notificationOpen: false});
  }

  render() {
    const stories = ['Your head is pounding. You reach up to touch it and as you do you realize you can’t tell if your eyes are open or closed. This startles you and you freeze. Where are you? You don’t know. Who are you? You can’t remember. Your heart starts racing as panic creeps in, slowly at first and then all at once. You take a breath and try to think back. How did you get here? Where is here? You decide to take things one step at a time. What is your name? As soon as that thought enters your mind you feel a vibration in your pocket.'];

    const messageActions = [
      <RaisedButton
        label="Ok"
        primary={true}
        onClick={this.handleMessageClose.bind(this)}
      />
    ];
    const storyActions = [
      <RaisedButton
        label="Ok"
        primary={true}
        onClick={this.handleStoryClose.bind(this)}
      />
    ];

    if (!this.state.clickedQuest) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <Dialog
              actions={storyActions}
              modal={false}
              open={this.state.storyOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleStoryClose.bind(this)}
            >
              {stories[this.props.map]}
            </Dialog>
          </div>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 800 515" style={{width: '1000px', enableBackground: "new 0 0 800 515"}} xmlSpace="preserve">
            <image className={styles.background} style={{overflow: 'visible'}} width="1600" height="1030" xlinkHref={`/assets/maps/basementMap.jpg`} transform="matrix(0.5 0 0 0.5 0 0)">
            </image>
            <circle className={styles.circle} id="circle0" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="573.9" cy="112.9" r="7.4"/>
            <circle className={styles.circle} id="circle1" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="580.9" cy="132.9" r="7.4"/>
            <g>
              <g>
                <path className="st1" id="path0" style={{display: 'none', fill: 'black'}} d="M576.6,119.8c0.1,2.1,0.5,4.1,1.1,6.1c0.1,0.5,0.9,0.3,0.7-0.2c-0.6-1.9-0.9-3.9-1.1-5.9C577.3,119.3,576.6,119.3,576.6,119.8L576.6,119.8z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle2" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="521" cy="151" rx="6.5" ry="6.5"/>
            <g>
              <g>
                <path className="st1" id="path1" style={{display: 'none', fill: 'black'}} d="M524.6,145.4c5.7-6.7,16.3-7.7,24.5-8.5c8-0.8,17.1-1.1,25.1,0.1c0.5,0.1,0.7-0.6,0.2-0.7c-8.7-1.4-18.6-1.1-27.3,0.1c-8,1-17.4,2-23,8.5C523.8,145.2,524.3,145.8,524.6,145.4L524.6,145.4z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle3" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="442.9" cy="200.9" r="7.4"/>
            <g>
              <g>
                <path className="st1" id="path2" style={{display: 'none', fill: 'black'}} d="M517.7,156.6c-11.3,9.9-24.2,17.3-38.4,22.2c-5.9,2.1-10.8,4.6-16,8.1c-4.5,3.1-10.7,5-14.5,8.9c-0.3,0.3,0.2,0.9,0.5,0.5c2.5-2.5,5.9-3.5,8.9-5.2c2.8-1.6,5.4-3.5,8.1-5.3c6.2-4,13-5.9,19.8-8.7c11.8-4.8,22.5-11.6,32.1-19.9C518.6,156.8,518.1,156.2,517.7,156.6L517.7,156.6z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle5" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="307.9" cy="265.9" r="7.4"/>
            <circle className={styles.circle} id="circle4" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="330.9" cy="251.9" r="7.4"/>
            <g>
              <g>
                <path className="st1" id="path3" style={{display: 'none', fill: 'black'}} d="M435.2,199.4c-9,0.2-17.5,2.8-25.5,6.6c-4.5,2.2-8.7,4.8-13,7.3c-3.9,2.3-8.7,2.8-12.4,5.3c-3.8,2.6-6.9,5.8-11,8c-4.1,2.2-8.4,4-12.7,5.9c-8.5,3.9-16.2,9-23.4,15c-0.4,0.3,0.2,0.8,0.5,0.5c7.3-6.2,15.2-11.3,24-15.3c7.3-3.3,14.4-6.5,20.6-11.7c3.6-3,7-3.5,11.1-5.3c4.2-1.8,7.9-4.6,11.9-6.8c9.3-5.1,19.2-8.7,29.9-9C435.7,200.2,435.7,199.4,435.2,199.4L435.2,199.4z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="st1" id="path4" style={{display: 'none', fill: 'black'}} d="M324.4,255.8c-3.1,2.5-6.6,4.1-9.8,6.4c-0.4,0.3,0,0.9,0.4,0.6c3.2-2.4,6.8-4,10-6.6C325.3,256,324.8,255.5,324.4,255.8L324.4,255.8z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle6" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="459.9" cy="352.9" r="7.4"/>
            <circle className={styles.circle} id="circle7" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="324.9" cy="296.9" r="7.4"/>
            <circle className={styles.circle} id="circle9" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="215.9" cy="414.9" r="7.4"/>
            <g>
              <g>
                <path className="st1" id="path5" style={{display: 'none', fill: 'black'}} d="M314.6,270c11.9,4.7,22,12.4,32.6,19.4c10.7,7.1,22.4,11.5,33.8,17.4c24.6,12.8,48.3,28,71.9,42.7c0.4,0.3,0.8-0.4,0.4-0.6c-24-15-48.2-30.7-73.5-43.5c-6.1-3.1-12.5-5.4-18.6-8.5c-5.4-2.8-10.5-6.1-15.6-9.5c-9.9-6.7-19.5-13.7-30.7-18.1C314.4,269.1,314.2,269.8,314.6,270L314.6,270z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="st1" id="path6" style={{display: 'none', fill: 'black'}} d="M458.9,360.3c-3.7,6.5-11.9,0.5-14.9-2.5c-2.4-2.4-4-5.3-5.9-8c-2.7-3.8-5.8-6.3-10-8.4c-10.6-5.3-20.2-12-30.4-17.9c-4.5-2.6-9.1-5-14-6.8c-5.8-2.1-12.1-2.6-17.5-5.6c-10.9-5.9-21.9-9.4-33.9-12.3c-0.5-0.1-0.7,0.6-0.2,0.7c6.8,1.7,13.6,3.3,20.2,5.8c6.2,2.3,11.6,6.3,17.7,8.4c6.8,2.3,13.5,3.4,20.1,6.6c5.9,2.9,11.5,6.4,17,9.9c5.6,3.5,11.1,7.1,17,10.1c3.2,1.6,6.6,3,9.4,5.3c2.7,2.3,4.5,5.5,6.5,8.4c3.4,5,14.5,15.5,19.5,6.7C459.8,360.2,459.2,359.9,458.9,360.3L458.9,360.3z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle8" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="242.9" cy="359.9" r="7.4"/>
            <g>
              <g>
                <path className="st1" id="path7" style={{display: 'none', fill: 'black'}} d="M319.5,292.1c-8.1-4-15,0-21.2,5.4c-9.4,8.3-19.6,15.8-32.6,16.3c-13,0.5-26.3-6.2-38.4-10.3c-5.1-1.8-10.2-3.3-15.2-5.3c-2.8-1.1-5.7-2.5-7.8-4.7c-3-3.1-2.5-6.7-3-10.6c-0.9-7.2-6.8-13.7-14.1-14.6c-4.8-0.6-12.8,3.2-8.8,9.1c1.8,2.7,5.6,3.5,8.4,4.8c5.1,2.5,8.4,7.1,12.4,11c7.6,7.3,18.1,9.6,27.6,13.4c7.4,2.9,14.6,6.1,21.7,9.7c5.6,2.9,11.8,5.7,16.6,9.9c6.1,5.4,7.7,12.7,5.4,20.5c-2.6,8.4-10.4,17.1-20,12.6c-0.4-0.2-0.8,0.4-0.4,0.6c16.6,7.8,27.5-18.6,19-30.4c-5.7-7.9-16.7-12.2-25.1-16.2c-10.4-5-21.1-8.5-31.8-12.8c-5.9-2.4-10.7-5.8-15.1-10.4c-3.4-3.6-6.5-6.8-11-8.8c-2-0.9-4.8-1.6-6.3-3.3c-5.7-6.4,2.7-8.6,5.7-8.8c2.1-0.2,4.7,0.8,6.5,1.7c6.4,3.4,8.2,9,8.8,15.6c0.7,8,6.8,11.1,13.7,13.6c11.9,4.3,23.9,8.8,36,12.4c11.6,3.5,22.8,2.9,33.6-3c4.9-2.6,9.1-6,13.2-9.7c6.3-5.6,13.2-11.2,21.9-6.8C319.5,293,319.9,292.3,319.5,292.1L319.5,292.1z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="st1" id="path8" style={{display: 'none', fill: 'black'}} d="M235.6,357.8c-2.9,0.1-5.7,1.4-5.7,4.7c0,2.1,1.5,3.8,2.5,5.4c2.3,3.4,3.5,7.3,4.9,11.2c2.5,6.6,3.5,12.8,3.7,19.8c0.2,4.6,0.3,9.2-3.2,12.6c-3.8,3.7-9.4,3-14.3,2.9c-0.5,0-0.5,0.7,0,0.8c4.6,0,10.7,0.8,14.5-2.5c4.2-3.6,3.9-9.5,3.7-14.5c-0.3-6-0.7-11.2-2.8-16.8c-1.1-3.1-2.2-6.3-3.5-9.4c-1.1-2.5-9.4-13.2,0.2-13.4C236.1,358.5,236.1,357.8,235.6,357.8L235.6,357.8z"/>
              </g>
            </g>
          </svg>
          <RaisedButton label="Return to Maps" onClick={() => this.props.handleReturnToMapsClick()} backgroundColor='#E94F37' labelColor='#F6F7EB' style={{width: '160px'}}/>
          <div>
            <Dialog
              actions={messageActions}
              modal={false}
              open={this.state.messageOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleMessageClose.bind(this)}
            >
              {this.changeName(this.state.puzzles.stories[this.state.completedQuests[this.state.completedQuests.length - 1]])}
            </Dialog>
          </div>
          <Snackbar
            bodyStyle={{backgroundColor: '#00BCD4'}}
            open={this.state.notificationOpen}
            message="Items have been added to your backpack!"
            autoHideDuration={3000}
            onRequestClose={this.handleNotificationClose.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Puzzle playerName={this.state.playerName} changeName={this.changeName.bind(this)} handleReturntoMapClick={this.handleReturntoMapClick.bind(this)} questions={this.state.puzzles.questions} currentQuest={this.state.currentQuest} handlePuzzleSubmit={this.handlePuzzleSubmit.bind(this)} handleEnterClick={this.handleEnterClick.bind(this)} messages={this.state.puzzles.messages}/>
        </div>
      );
    }
  }
}

export default Map;
