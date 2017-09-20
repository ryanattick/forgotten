
import React from 'react';
import Puzzle from './puzzle.js';
import Lives from './lives.js';
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
      avatar: 'https://i.imgur.com/sZwuwPk.png',
      greenclickedQuest: null,
      currentQuestBeforeGreenClick: null,
      clickedQuest: false,
      playerName: '',
      lives: this.props.lives,
      lifeImg: [],
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
        },
        time: {
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
      notificationOpen: false,
      gameOverOpen: false,
      attempts: 3
    };
  }
  componentWillMount() {
    this.handleLives();
    if (this.props.currentPuzzleNum >= parseInt(this.props.map + '0') + 10) {
      this.setState({
        completedQuests: ['0'].concat(this.state.levelsRemaining),
        levelsRemaining: [],
        currentQuest: '10',
        lives: this.props.lives
      }, () => {
        this.colorPuzzles(true);
      });
    } else if (this.props.currentPuzzleNum !== parseInt(this.props.map + '0')) {
      this.setState({
        currentQuest: this.props.currentPuzzleNum.toString()[1] || this.props.currentPuzzleNum.toString()[0],
        lives: this.props.lives,
        completedQuests: ['0'].concat(this.state.levelsRemaining.slice(0, this.props.currentPuzzleNum - parseInt(this.props.map + '1'))),
        levelsRemaining: this.state.levelsRemaining.slice(this.props.currentPuzzleNum - parseInt(this.props.map + '0'))
      }, () => {
        this.colorPuzzles(true);
      });
    }
    Request.get('/puzzleData', (data) => {
      if (data.avatar) {
        this.setState({
          puzzles: data.puzzles,
          playerName: data.playerName,
          avatar: data.avatar
        });
      } else {
        this.setState({
          puzzles: data.puzzles,
          playerName: data.playerName
        });
      }
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
          var paths = document.getElementsByClassName(`path${this.state.completedQuests[i]}`);
          for (var j = 0; j < paths.length; j++) {
            paths[j].style.display = 'block';
          }
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
          var noMountPaths = document.getElementsByClassName(`path${this.state.completedQuests[i]}`);
          for (var k = 0; k < noMountPaths.length; k++) {
            noMountPaths[k].style.display = 'block';
          }
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
    clearInterval(interval);
  }

  handlePuzzleSubmit() {
    var answer = document.getElementById('puzzleAnswer').value;
    if (this.state.puzzles.answers[this.props.map + this.state.currentQuest].toLowerCase() === answer.toLowerCase()) {
      if (this.state.greenclickedQuest) {
        this.setState({
          greenclickedQuest: null,
          currentQuest: this.state.currentQuestBeforeGreenClick
        }, function() {
          this.colorPuzzles();
        });
        this.handleReturntoMapClick();
      } else if (this.state.currentQuest === '9') {
        Request.post('/userItems', {level: parseInt(this.props.map + this.state.currentQuest)}, (data) => {
        });
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
        Promise.resolve(Request.post('/userItems', {level: parseInt(this.props.map + this.state.currentQuest)}, (data) => {
        })).then(() => {
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
        });
      }
      if (this.state.levelsRemaining.length !== 0 && !this.state.greenclickedQuest) {
        this.handleReturntoMapClick();
      }
    } else {
      document.getElementById('puzzleAnswer').value = '';
      if (!this.state.puzzles.time[this.props.map + this.state.currentQuest]) {
        this.setState({
          attempts: this.state.attempts - 1
        }, () => {
          if (this.state.attempts === 0) {
            this.handleReturntoMapClick(true);
            if (this.state.lives === 0) {
              this.handleLifeChange();
              this.state.attempts = 3;
            } else {
              Request.post('/lives', {lives: this.props.lives - 1}, function(data) {
                console.log(data);
              });
              this.handleLifeChange(this.state.lives - 1);
              this.state.attempts = 3;
            }
          }
        });
      }
    }
  }

  checkForItems(quest) {
    var countNewItems = 0;
    var found = false;
    for (var key in this.state.puzzles.items) {
      if (this.state.puzzles.items[key].puzzleID === parseInt(this.props.map + quest)) {
        countNewItems++;
        found = true;
      }
    }
    this.props.handleBadgeChange(countNewItems);
    return found;
  }

  handleLifeChange(lives) {
    if (lives) {
      this.setState({
        lives: lives,
        lifeImg: this.state.lifeImg.splice(0, this.state.lifeImg.length - 1)
      });
      for (var i = 0; i < lives; i++) {
        this.state.lifeImg.push('/assets/items/valentines-heart.svg');
      }
    } else if (this.props.map === '0') {
      this.setState({
        lives: 5,
        currentQuest: '0',
        levelsRemaining: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        completedQuests: [],
        lifeImg: this.state.lifeImg.splice(0, this.state.lifeImg.length - 1)
      }, () => {
        this.handleGameOverOpen();
        this.handleLives();
      });
      Request.post('/lives', {lives: 5}, function(data) {
      });
      Request.post('/mapData', {level: 0}, (data) => {
      });
      Request.post('/removeItems', {level: 0}, (data) => {
      });
    } else {
      this.setState({
        lives: 5,
        currentQuest: '0',
        levelsRemaining: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        completedQuests: []
      }, () => {
        this.handleGameOverOpen();
      });
      Request.post('/lives', {lives: 5}, function(data) {
      });
      Request.post('/mapData', {level: parseInt(this.props.map + '0')}, (data) => {
      });
      Request.post('/removeItems', {level: parseInt(this.props.map + '0')}, (data) => {
      });
    }
  }

  handleLives() {
    for (var i = 0; i < this.state.lives; i++) {
      this.state.lifeImg.push("/assets/items/valentines-heart.svg");
    }
  }

  handleEnterClick(e) {
    if (e.keyCode === 13) {
      var val = document.getElementById('puzzleAnswer').value;
      document.getElementById('puzzleAnswer').value = val.slice(0, val.length - 1);
      this.handlePuzzleSubmit();
    }
  }

  handleMessageOpen() {
    this.setState({messageOpen: true});
  }

  handleMessageClose() {
    this.setState({messageOpen: false});
    var path = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}`);
    var path1 = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}1`);
    var path2 = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}2`);
    var path3 = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}3`);
    var path4 = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}4`);
    var path5 = $(`#path${this.state.completedQuests[this.state.completedQuests.length - 1]}4`);
    var circle = $(`#circle${this.state.currentQuest}`);
    if (path5[0]) {
      circle.add(path).add(path1).add(path2).add(path3).add(path4).add(path5).fadeIn(1500);
    } else if (path4[0]) {
      circle.add(path).add(path1).add(path2).add(path3).add(path4).fadeIn(1500);
    } else if (path3[0]) {
      circle.add(path).add(path1).add(path2).add(path3).fadeIn(1500);
    } else if (path2[0]) {
      circle.add(path).add(path1).add(path2).fadeIn(1500);
    } else if (path1[0]) {
      circle.add(path).add(path1).fadeIn(1500);
    } else {
      circle.add(path).fadeIn(1500);
    }
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

  handleGameOverOpen() {
    this.setState({gameOverOpen: true});
  }

  handleGameOverClose() {
    this.setState({gameOverOpen: false});
  }

  render() {

    const lives = this.state.lifeImg.map((life, index) =>
      <img src={life} key={index} style={{maxHeight:'50px', maxWidth:'50px', marginLeft:'20px'}}/>
    );

    const stories = ['Your head is pounding. You reach up to touch it and as you do you realize you can’t tell if your eyes are open or closed. This startles you and you freeze. Where are you? You don’t know. Who are you? You can’t remember. Your heart starts racing as panic creeps in, slowly at first and then all at once. You take a breath and try to think back. How did you get here? Where is here? You decide to take things one step at a time. What is your name? As soon as that thought enters your mind you feel a vibration in your pocket.',
      'You finally manage to solve the puzzle given to you by still an unknown sender. However all you care about at the moment is to get out of this underground system and get some fresh air, of which, it seems like, you haven’t gotten in years. You grab your backpack and frantically enter the answer you came up with to solve the last puzzle. The light turns green and you hear a metallic popping sound and feel a little breeze coming from above. The trap door has been unlocked! You jump back onto the chair, push the hatch outwards and climb out onto what seems like a kitchen floor. Right beside the hatch, there is a small refrigerator with a sign that says “Out of order!”. The air is not as fresh as you had hoped, but it’s still better than the air from underground, filled with a foul smell of rotting food supplies, dust and corrosion. Before you are able to take a good look around, your phone buzzes. After taking a deep breath you take a look at the new message.'];
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
    const gameOverActions = [
      <RaisedButton
        label="Return to beginning of level"
        primary={true}
        onClick={this.handleStoryClose.bind(this)}
      />
    ];


    if (!this.state.clickedQuest && this.props.map === '0') {
      return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <Dialog
              modal={false}
              open={this.state.storyOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleStoryClose.bind(this)}
              bodyStyle={{backgroundImage: 'url("/assets/backgrounds/storyBG.jpg")', backgroundSize: '100% 100%', border: '0', filter: 'brightness(90%)'}}
            >
              <div className={styles.story_pop_up}>
                {stories[this.props.map]} <br></br>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <RaisedButton label="Close" onClick={this.handleStoryClose.bind(this)} backgroundColor='#393E41' labelColor='rgb(255, 255, 255)' overlayStyle={{margin: 'auto'}}/>
              </div>
            </Dialog>
            <Dialog
              modal={false}
              open={this.state.gameOverOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleGameOverClose.bind(this)}
              bodyStyle={{backgroundImage: 'url("/assets/backgrounds/storyBG.jpg")', backgroundSize: '100% 100%', border: '0', filter: 'brightness(90%)'}}
            >
              <div className={styles.gameOver_popup_content}>
                <img style={{backgroundImage: `url(${this.state.avatar})`}} src={'/assets/maps/blood.png'}/>
                <div>{'GAME OVER'}</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <RaisedButton label="Close" onClick={this.handleGameOverClose.bind(this)} backgroundColor='black' labelColor='rgb(255, 255, 255)' overlayStyle={{margin: 'auto'}}/>
              </div>
            </Dialog>
          </div>
          <div>
            {lives}
          </div>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 800 515" style={{width: '1000px', enableBackground: 'new 0 0 800 515'}} xmlSpace="preserve">
            <image className={styles.background} style={{overflow: 'visible'}} width="1600" height="1030" xlinkHref={'/assets/maps/basementMap.jpg'} transform="matrix(0.5 0 0 0.5 0 0)">
            </image>
            <circle className={styles.circle} id="circle0" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', fill: '#E94F37', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="573.9" cy="112.9" r="7.4"/>
            <circle className={styles.circle} id="circle1" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="580.9" cy="132.9" r="7.4"/>
            <g>
              <g>
                <path className="path0" id="path0" style={{display: 'none', fill: 'black'}} d="M576.6,119.8c0.1,2.1,0.5,4.1,1.1,6.1c0.1,0.5,0.9,0.3,0.7-0.2c-0.6-1.9-0.9-3.9-1.1-5.9C577.3,119.3,576.6,119.3,576.6,119.8L576.6,119.8z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle2" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="521" cy="151" rx="6.5" ry="6.5"/>
            <g>
              <g>
                <path className="path1" id="path1" style={{display: 'none', fill: 'black'}} d="M524.6,145.4c5.7-6.7,16.3-7.7,24.5-8.5c8-0.8,17.1-1.1,25.1,0.1c0.5,0.1,0.7-0.6,0.2-0.7c-8.7-1.4-18.6-1.1-27.3,0.1c-8,1-17.4,2-23,8.5C523.8,145.2,524.3,145.8,524.6,145.4L524.6,145.4z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle3" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="442.9" cy="200.9" r="7.4"/>
            <g>
              <g>
                <path className="path2" id="path2" style={{display: 'none', fill: 'black'}} d="M517.7,156.6c-11.3,9.9-24.2,17.3-38.4,22.2c-5.9,2.1-10.8,4.6-16,8.1c-4.5,3.1-10.7,5-14.5,8.9c-0.3,0.3,0.2,0.9,0.5,0.5c2.5-2.5,5.9-3.5,8.9-5.2c2.8-1.6,5.4-3.5,8.1-5.3c6.2-4,13-5.9,19.8-8.7c11.8-4.8,22.5-11.6,32.1-19.9C518.6,156.8,518.1,156.2,517.7,156.6L517.7,156.6z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle5" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="307.9" cy="265.9" r="7.4"/>
            <circle className={styles.circle} id="circle4" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="330.9" cy="251.9" r="7.4"/>
            <g>
              <g>
                <path className="path3" id="path3" style={{display: 'none', fill: 'black'}} d="M435.2,199.4c-9,0.2-17.5,2.8-25.5,6.6c-4.5,2.2-8.7,4.8-13,7.3c-3.9,2.3-8.7,2.8-12.4,5.3c-3.8,2.6-6.9,5.8-11,8c-4.1,2.2-8.4,4-12.7,5.9c-8.5,3.9-16.2,9-23.4,15c-0.4,0.3,0.2,0.8,0.5,0.5c7.3-6.2,15.2-11.3,24-15.3c7.3-3.3,14.4-6.5,20.6-11.7c3.6-3,7-3.5,11.1-5.3c4.2-1.8,7.9-4.6,11.9-6.8c9.3-5.1,19.2-8.7,29.9-9C435.7,200.2,435.7,199.4,435.2,199.4L435.2,199.4z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path4" id="path4" style={{display: 'none', fill: 'black'}} d="M324.4,255.8c-3.1,2.5-6.6,4.1-9.8,6.4c-0.4,0.3,0,0.9,0.4,0.6c3.2-2.4,6.8-4,10-6.6C325.3,256,324.8,255.5,324.4,255.8L324.4,255.8z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle6" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="459.9" cy="352.9" r="7.4"/>
            <circle className={styles.circle} id="circle7" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="324.9" cy="296.9" r="7.4"/>
            <circle className={styles.circle} id="circle9" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="215.9" cy="414.9" r="7.4"/>
            <g>
              <g>
                <path className="path5" id="path5" style={{display: 'none', fill: 'black'}} d="M314.6,270c11.9,4.7,22,12.4,32.6,19.4c10.7,7.1,22.4,11.5,33.8,17.4c24.6,12.8,48.3,28,71.9,42.7c0.4,0.3,0.8-0.4,0.4-0.6c-24-15-48.2-30.7-73.5-43.5c-6.1-3.1-12.5-5.4-18.6-8.5c-5.4-2.8-10.5-6.1-15.6-9.5c-9.9-6.7-19.5-13.7-30.7-18.1C314.4,269.1,314.2,269.8,314.6,270L314.6,270z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path6" id="path6" style={{display: 'none', fill: 'black'}} d="M458.9,360.3c-3.7,6.5-11.9,0.5-14.9-2.5c-2.4-2.4-4-5.3-5.9-8c-2.7-3.8-5.8-6.3-10-8.4c-10.6-5.3-20.2-12-30.4-17.9c-4.5-2.6-9.1-5-14-6.8c-5.8-2.1-12.1-2.6-17.5-5.6c-10.9-5.9-21.9-9.4-33.9-12.3c-0.5-0.1-0.7,0.6-0.2,0.7c6.8,1.7,13.6,3.3,20.2,5.8c6.2,2.3,11.6,6.3,17.7,8.4c6.8,2.3,13.5,3.4,20.1,6.6c5.9,2.9,11.5,6.4,17,9.9c5.6,3.5,11.1,7.1,17,10.1c3.2,1.6,6.6,3,9.4,5.3c2.7,2.3,4.5,5.5,6.5,8.4c3.4,5,14.5,15.5,19.5,6.7C459.8,360.2,459.2,359.9,458.9,360.3L458.9,360.3z"/>
              </g>
            </g>
            <circle className={styles.circle} id="circle8" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="242.9" cy="359.9" r="7.4"/>
            <g>
              <g>
                <path className="path7" id="path7" style={{display: 'none', fill: 'black'}} d="M319.5,292.1c-8.1-4-15,0-21.2,5.4c-9.4,8.3-19.6,15.8-32.6,16.3c-13,0.5-26.3-6.2-38.4-10.3c-5.1-1.8-10.2-3.3-15.2-5.3c-2.8-1.1-5.7-2.5-7.8-4.7c-3-3.1-2.5-6.7-3-10.6c-0.9-7.2-6.8-13.7-14.1-14.6c-4.8-0.6-12.8,3.2-8.8,9.1c1.8,2.7,5.6,3.5,8.4,4.8c5.1,2.5,8.4,7.1,12.4,11c7.6,7.3,18.1,9.6,27.6,13.4c7.4,2.9,14.6,6.1,21.7,9.7c5.6,2.9,11.8,5.7,16.6,9.9c6.1,5.4,7.7,12.7,5.4,20.5c-2.6,8.4-10.4,17.1-20,12.6c-0.4-0.2-0.8,0.4-0.4,0.6c16.6,7.8,27.5-18.6,19-30.4c-5.7-7.9-16.7-12.2-25.1-16.2c-10.4-5-21.1-8.5-31.8-12.8c-5.9-2.4-10.7-5.8-15.1-10.4c-3.4-3.6-6.5-6.8-11-8.8c-2-0.9-4.8-1.6-6.3-3.3c-5.7-6.4,2.7-8.6,5.7-8.8c2.1-0.2,4.7,0.8,6.5,1.7c6.4,3.4,8.2,9,8.8,15.6c0.7,8,6.8,11.1,13.7,13.6c11.9,4.3,23.9,8.8,36,12.4c11.6,3.5,22.8,2.9,33.6-3c4.9-2.6,9.1-6,13.2-9.7c6.3-5.6,13.2-11.2,21.9-6.8C319.5,293,319.9,292.3,319.5,292.1L319.5,292.1z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path8" id="path8" style={{display: 'none', fill: 'black'}} d="M235.6,357.8c-2.9,0.1-5.7,1.4-5.7,4.7c0,2.1,1.5,3.8,2.5,5.4c2.3,3.4,3.5,7.3,4.9,11.2c2.5,6.6,3.5,12.8,3.7,19.8c0.2,4.6,0.3,9.2-3.2,12.6c-3.8,3.7-9.4,3-14.3,2.9c-0.5,0-0.5,0.7,0,0.8c4.6,0,10.7,0.8,14.5-2.5c4.2-3.6,3.9-9.5,3.7-14.5c-0.3-6-0.7-11.2-2.8-16.8c-1.1-3.1-2.2-6.3-3.5-9.4c-1.1-2.5-9.4-13.2,0.2-13.4C236.1,358.5,236.1,357.8,235.6,357.8L235.6,357.8z"/>
              </g>
            </g>
          </svg>
          <RaisedButton label="Return to Maps" onClick={() => this.props.handleReturnToMapsClick()} backgroundColor='#E94F37' labelColor='#F6F7EB' style={{width: '160px'}}/>
          <div>
            <Dialog
              modal={false}
              open={this.state.messageOpen}
              autoScrollBodyContent={true}
              bodyStyle={{backgroundImage: 'url("/assets/backgrounds/storyBG.jpg")', backgroundSize: '100% 100%', border: '0', filter: 'brightness(90%)'}}
            >
              <div className={styles.story_pop_up}>
                {this.changeName(this.state.puzzles.stories[this.props.map + this.state.completedQuests[this.state.completedQuests.length - 1]])}
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <RaisedButton label="Close" onClick={this.handleMessageClose.bind(this)} backgroundColor='#393E41' labelColor='rgb(255, 255, 255)' overlayStyle={{margin: 'auto'}}/>
              </div>
            </Dialog>
          </div>
          <Snackbar
            bodyStyle={{backgroundColor: '#44BBA4'}}
            open={this.state.notificationOpen}
            message="Items have been added to your backpack!"
            autoHideDuration={3000}
            onRequestClose={this.handleNotificationClose.bind(this)}
          />
        </div>
      );
    } else if (!this.state.clickedQuest && this.props.map === '1') {
      return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <Dialog
              modal={false}
              open={this.state.storyOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleStoryClose.bind(this)}
              bodyStyle={{backgroundImage: 'url("/assets/backgrounds/storyBG.jpg")', backgroundSize: '100% 100%', border: '0', filter: 'brightness(90%)'}}
            >
              <div className={styles.story_pop_up}>
                {stories[this.props.map]} <br></br>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <RaisedButton label="Close" onClick={this.handleStoryClose.bind(this)} backgroundColor='#393E41' labelColor='rgb(255, 255, 255)' overlayStyle={{margin: 'auto'}}/>
              </div>
            </Dialog>
            <Dialog
              modal={false}
              open={this.state.gameOverOpen}
              autoScrollBodyContent={true}
              onRequestClose={this.handleGameOverClose.bind(this)}
              bodyStyle={{backgroundImage: 'url("/assets/backgrounds/storyBG.png")', backgroundSize: '100% 100%', border: '0', filter: 'brightness(90%)'}}
            >
              <div className={styles.gameOver_popup_content}>
                <img style={{backgroundImage: `url(${this.state.avatar})`}} src={'/assets/maps/blood.png'}/>
                <div>{'GAME OVER'}</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <RaisedButton label="Close" onClick={this.handleGameOverClose.bind(this)} backgroundColor='black' labelColor='rgb(255, 255, 255)' overlayStyle={{margin: 'auto'}}/>
              </div>
            </Dialog>
          </div>
          <div>
            {lives}
          </div>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 800 515" style={{width: '1000px', enableBackground: 'new 0 0 800 515'}} xmlSpace="preserve">
            <image className={styles.background} style={{overflow: 'visible'}} width="1600" height="1030" xlinkHref={'/assets/maps/houseMap.jpg'} transform="matrix(0.5 0 0 0.5 0 0)">
            </image>
            <ellipse className={styles.circle} id="circle0" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', fill: '#E94F37', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="426.8" cy="455.6" rx="6.8" ry="6.9"/>
            <ellipse className={styles.circle} id="circle1" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="403.8" cy="399.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path0" id="path0" style={{display: 'none', fill: 'black'}} d="M421.6,450.6c-7.5-7.4-16.9-14.1-25.7-19.8c-2.3-1.5-5.3-2-7.2-4.1c-3.1-3.4-2.1-7-0.7-10.8c2.2-5.8,4.6-8.8,10.2-11.6c0.4-0.2,0.1-0.9-0.4-0.6c-4.7,2.3-8,4.9-9.8,9.9c-1.5,4.1-3.5,7.8-1.1,12.1c1.2,2.1,2.8,2.9,4.9,4c3.2,1.6,5.7,3.3,8.6,5.5c6.9,5.1,14.4,9.9,20.6,16C421.4,451.4,421.9,450.9,421.6,450.6L421.6,450.6z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle2" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="318.8" cy="380.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path1" id="path1" style={{display: 'none', fill: 'black'}} d="M399,393.8c-3.2,0.8-6.3,1.8-9.3,3.2c-4.5,2.1-8.5,5.9-13.3,6.9c-3.4,0.7-6.9,0.5-10.3,1.2c-4.9,1-9.5,2.5-14.6,2.6c-0.5,0-0.5,0.8,0,0.8c4.2-0.1,8.1-1.1,12.2-2c4.2-1,8.5-0.8,12.8-1.7c3.5-0.7,6.1-3,9.1-4.7c4.3-2.5,8.8-4.3,13.6-5.5C399.6,394.4,399.4,393.7,399,393.8L399,393.8z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path1" id="path11" style={{display: 'none', fill: 'black'}} d="M351.6,407.6c-2.7-0.7-5.7-5.5-7.8-7.5c-3.2-3-5.7-6.4-7.3-10.5c-0.2-0.4-0.9-0.2-0.7,0.2c1.7,4.2,4.2,7.7,7.5,10.9c1.9,1.8,3.4,3.7,5.1,5.7c0.9,1,1.7,1.7,3,2C351.9,408.5,352.1,407.7,351.6,407.6L351.6,407.6z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path1" id="path12" style={{display: 'none', fill: 'black'}} d="M333.1,383c-0.7-0.9-2.4-1.4-3.5-1.9c-1.2-0.6-2.4-1.2-3.7-1.6c-0.5-0.1-0.7,0.6-0.2,0.7c1.3,0.3,2.4,0.9,3.6,1.5c1,0.5,2.6,0.9,3.3,1.8C332.9,383.9,333.4,383.4,333.1,383L333.1,383z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle3" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="385.8" cy="297.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path2" id="path2" style={{display: 'none', fill: 'black'}} d="M312.7,377.7c-7.4-7.3-15.9-13.5-25.9-16.5c-2.3-0.7-4.7-1.2-7.2-1.6c-3-0.4-6.1,0.2-9-0.2c-8.1-1.1-1.2-7.9,1.7-9.8c2.5-1.7,5.4-3,8.2-4.1c4.8-2,9.9-3.4,14.7-5.4c4.2-1.8,7.8-4.2,11.7-6.6c4.5-2.8,9.7-3.1,14.3-5.3c1.9-0.9,3.7-2,5.3-3.4c2.5-2,4.5-5.3,7.7-6.3c0.5-0.1,0.3-0.9-0.2-0.7c-1.9,0.6-2.9,1.5-4.3,2.9c-2.5,2.5-5,4.9-8.2,6.5c-5.1,2.6-10.8,3-15.7,6.1c-5.9,3.7-11.6,6.5-18.2,8.8c-5.2,1.8-10.4,3.6-15,6.5c-2.7,1.7-6.9,4.4-7,8c-0.1,3.8,3,3.7,6,3.5c15.9-0.9,29.7,7.3,40.6,18.1C312.5,378.6,313,378,312.7,377.7L312.7,377.7z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path2" id="path21" style={{display: 'none', fill: 'black'}} d="M337.6,317c6.5-4.1,12.6-8.3,20-10.5c3.6-1.1,7.4-2.4,11.2-2.9c4.1-0.5,7-0.6,10.9-2.2c0.4-0.2,0.3-0.9-0.2-0.7c-4.3,1.7-8.3,1.5-12.7,2.4c-3.7,0.8-7.5,2.1-11.1,3.3c-6.7,2.2-12.5,6.3-18.5,10.1C336.8,316.6,337.2,317.2,337.6,317L337.6,317z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path3" id="path3" style={{display: 'none', fill: 'black'}} d="M392.5,300.1c5.4,0.6,9.4,5.1,13.4,8.4c3.1,2.6,6.2,5.2,9.1,7.9c2.7,2.5,5.7,4.9,8,7.8c3.8,4.7,4.2,13.3-0.8,17.3c-0.4,0.3,0.2,0.8,0.5,0.5c3.7-3,4.2-7.3,3.5-11.8c-0.7-5-3.2-7.1-6.7-10.5c-4.9-4.8-10.1-9.2-15.4-13.5c-3.6-3-7-6.2-11.8-6.8C392,299.3,392,300.1,392.5,300.1L392.5,300.1z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle4" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="560.8" cy="272.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path3" id="path31" style={{display: 'none', fill: 'black'}} d="M543.5,233.6c-9.4,0.9-15.1,9.3-12.5,18.4c2.8,9.5,14,16.1,23.5,17.1c0.5,0.1,0.5-0.7,0-0.8c-7-0.7-17.2-5.9-20.9-12c-5.5-9.1-1.3-20.9,9.9-22C544,234.3,544,233.6,543.5,233.6L543.5,233.6z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path4" id="path4" style={{display: 'none', fill: 'black'}} d="M567.5,270.9c1.5-0.9,3.5-2.6,2.2-4.5c-0.3-0.4-0.9,0-0.6,0.4c1.1,1.5-0.8,2.8-1.9,3.4C566.7,270.5,567,271.2,567.5,270.9L567.5,270.9z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path4" id="path41" style={{display: 'none', fill: 'black'}} d="M567.2,259.3c-7.1-5-4.8-13.9,0.2-19.4c0.3-0.4-0.2-0.9-0.5-0.5c-5.4,5.9-7.6,15.4-0.1,20.6C567.2,260.2,567.6,259.6,567.2,259.3L567.2,259.3z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle5" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="592.8" cy="259.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path4" id="path42" style={{display: 'none', fill: 'black'}} d="M572.1,234.6c6.3-2.3,13.5-2.3,19.3,1.5c6.3,4.2,12.5,11,6.2,18.3c-0.3,0.4,0.2,0.9,0.5,0.5c5.4-6.1,2.9-11.7-2.5-16.5c-6.8-6-15-7.6-23.6-4.5C571.4,234,571.6,234.8,572.1,234.6L572.1,234.6z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle6" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="431.2" cy="88.6" rx="5.2" ry="4.9"/>
            <g>
              <g>
                <path className="path5" id="path5" style={{display: 'none', fill: 'black'}} d="M590.2,265.5c-2.2,2.2-4.4,4.5-6.6,6.7c-0.3,0.3,0.2,0.9,0.5,0.5c2.2-2.2,4.4-4.5,6.6-6.7C591,265.7,590.5,265.1,590.2,265.5L590.2,265.5z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path5" id="path51" style={{display: 'none', fill: 'black'}} d="M582,273.8c-13.2,12.3-31.9,6.7-45.9-0.8c-14-7.5-27.7-15.7-41.3-23.9c-27.6-16.6-54.7-34.5-79.3-55.4c-6.5-5.6-13.1-11.2-19.1-17.4c-2.9-3-5.1-7.5-2.5-11.4c1.3-1.9,3.5-3.1,5.4-4.2c4.1-2.4,8.3-4.8,12.5-7.1c0.4-0.2,0-0.9-0.4-0.6c-4.1,2.4-8.3,4.7-12.5,7.1c-2.4,1.4-5.1,3-6.5,5.5c-3,5.5,2.3,10.2,5.9,13.7c13.2,12.6,27.3,24.2,42,35c15.2,11.1,31,21.5,47.1,31.3c16.1,9.8,32.3,19.8,49,28.5c14.2,7.4,32.9,12.6,46,0.2C582.9,274,582.4,273.5,582,273.8L582,273.8z"
                />
              </g>
            </g>
            <g>
              <g>
                <path className="path5" id="path52" style={{display: 'none', fill: 'black'}} d="M429.4,145c1.8-2.5,3.3-4.9,4-7.9c0.9-4,1.7-7.3,4.6-10.5c0.3-0.4-0.2-0.9-0.5-0.5c-2,2.1-3.4,4.5-4.1,7.3c-1.1,4.3-2,7.6-4.7,11.2C428.4,145,429.1,145.4,429.4,145L429.4,145z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path5" id="path53" style={{display: 'none', fill: 'black'}} d="M442.9,120c4.8-6.4,6-14.4,5-22.2c-0.9-7.2-4.5-9.7-11.6-9.9c-0.5,0-0.5,0.7,0,0.8c5,0.1,8.7,1.4,10.3,6.4c0.8,2.6,0.8,6,0.8,8.8c-0.2,5.8-1.7,11.2-5.2,15.8C441.9,120,442.6,120.4,442.9,120L442.9,120z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path6" id="path6" style={{display: 'none', fill: 'black'}} d="M433.8,92.9c0.2,0.7,0.4,1.4,0.6,2.1c0.1,0.5,0.9,0.3,0.7-0.2c-0.2-0.7-0.4-1.4-0.6-2.1C434.4,92.3,433.6,92.5,433.8,92.9L433.8,92.9z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path6" id="path61" style={{display: 'none', fill: 'black'}} d="M432.1,129c0,3.4-0.6,7-3.5,9.2c-0.4,0.3,0,0.9,0.4,0.6c3.1-2.4,3.9-6.1,3.9-9.8C432.8,128.5,432.1,128.5,432.1,129L432.1,129z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path6" id="path62" style={{display: 'none', fill: 'black'}} d="M411.6,148.8c-11.1,3.3-23.6,8.8-23.1,22.4c0.2,5.6,3.1,10.5,6.4,14.8c3.8,5,7.7,11.2,12.7,15c12,9,23,18.5,36.9,24.7c12.7,5.6,26.3,9,40.1,10.6c8.2,0.9,16.9,1.7,25.1,0.6c8.1-1.1,15.1-5.3,21.9-9.5c0.4-0.3,0-0.9-0.4-0.6c-8.1,5-16,9.3-25.8,9.8c-8.5,0.4-17.3-0.3-25.7-1.6c-15.8-2.3-31.3-7.1-45.1-15.1c-7.2-4.1-13.4-9.2-19.8-14.4c-2.7-2.2-5.8-4-8.3-6.3c-2.7-2.5-4.7-5.9-7-8.7c-5.7-7-12.2-14.7-9.6-24.4c2.7-10.3,12.9-13.8,22-16.5C412.3,149.4,412.1,148.7,411.6,148.8L411.6,148.8z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path3" id="path32" style={{display: 'none', fill: 'black'}} d="M422,341.8c-2,2.2-4.2,4.3-6.4,6.2c-0.4,0.3,0.2,0.8,0.5,0.5c2.3-1.9,4.4-4,6.4-6.2C422.9,342,422.3,341.5,422,341.8L422,341.8z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path6" id="path63" style={{display: 'none', fill: 'black'}} d="M405.1,341.9c3.2-2.1,5.2-5.7,4.6-9.7c-0.7-4.5-4.7-7-8.3-9.2c-12.5-7.6-25.9-15.9-40.4-19c-2.3-0.5-4.7-0.9-7-0.5c-2.8,0.4-4.2,1.5-7.1,1.2c-3-0.3-4.3-1.5-6.7-3.2c-3.7-2.6-6.7-5-9.2-8.9c-1.3-2.1-2.9-3.2-5-4.5c-12.9-8-26.2-16.1-40.2-22c-0.4-0.2-0.6,0.5-0.2,0.7c12.6,5.3,24.3,12.5,36,19.5c3.2,1.9,6.7,3.5,8.7,6.7c1.1,1.8,1.7,3.4,3.3,4.9c2,1.9,4.7,3.3,7,4.9c1.7,1.2,3.6,3,5.8,3.4c1.7,0.3,3.1-0.5,4.7-0.9c4.3-1.2,8-0.9,12.3,0.3c6.6,1.8,12.9,4.6,19,7.6c5.9,3,11.6,6.3,17.2,9.7c2.5,1.5,5.3,2.9,7.2,5.1c3.7,4.3,2.7,10.3-2,13.4C404.3,341.5,404.7,342.2,405.1,341.9L405.1,341.9z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path6" id="path64" style={{display: 'none', fill: 'black'}} d="M261.1,247c-4.8-2.9-4.6-9.8-7.7-14.2c-2.3-3.2-5.3-5.6-8.8-7.2c-0.4-0.2-0.8,0.4-0.4,0.6c5.3,2.4,9.4,6.7,11.2,12.2c1.5,4.3,1.1,6.8,5.3,9.3C261.1,247.8,261.5,247.2,261.1,247L261.1,247z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle7" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="237.8" cy="223.6" rx="6.8" ry="6.9"/>
            <ellipse className={styles.circle} id="circle8" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="244.8" cy="244.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path7" id="path7" style={{display: 'none', fill: 'black'}} d="M231.4,225.9c-8.7,3.2,3.9,12.9,7.3,14.9c0.4,0.2,0.8-0.4,0.4-0.6c-2.2-1.3-4-3-5.9-4.8c-0.6-0.6-1.3-1.3-1.9-1.9c-0.6-0.6-1.2-1.2-1.7-1.9c-0.8-2.6-0.2-4.2,2-4.9C232,226.4,231.8,225.7,231.4,225.9L231.4,225.9z"/>
              </g>
            </g>
            <ellipse className={styles.circle} id="circle9" onClick={(e) => this.handleMapQuestClick(e)} style={{cursor: 'pointer', cursor: 'hand', display: 'none', fill: 'red', stroke: 'black', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="251.8" cy="342.6" rx="6.8" ry="6.9"/>
            <g>
              <g>
                <path className="path8" id="path8" style={{display: 'none', fill: 'black'}} d="M250.3,248.9c3.9,1.3,7,3.5,10.1,6.2c0.4,0.3,0.9-0.2,0.5-0.5c-3.2-2.7-6.4-5.1-10.5-6.4C250,248,249.8,248.8,250.3,248.9L250.3,248.9z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path8" id="path81" style={{display: 'none', fill: 'black'}} d="M280.1,270.3c5.6,2.3,13.9,7.1,17.4,12.1c1.3,1.9,2.1,4.1,3.3,6.1c1.2,1.9,3.7,3.8,4.2,5.9c0.1,0.5,0.8,0.3,0.7-0.2c-0.6-2.7-3.3-4.4-4.7-6.8c-1.4-2.5-2.5-5.2-4.4-7.3c-4.1-4.4-10.8-8.3-16.3-10.6C279.8,269.4,279.6,270.2,280.1,270.3L280.1,270.3z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="path8" id="path82" style={{display: 'none', fill: 'black'}} d="M306.2,298.4c1.9,6.1,2.8,13.7,2.7,20.2c-0.1,9.5-7.1,12.9-15.3,14.7c-5.9,1.3-12.7,2-18.1,4.6c-2.8,1.4-5.1,2.4-8.4,2.9c-3,0.5-5.8,1.1-8.7,2c-0.5,0.1-0.3,0.9,0.2,0.7c3.9-1.3,7.9-1.2,11.8-2.3c3.6-1,6.5-3.3,10.2-4.3c6.9-1.8,14.8-2.3,21.3-5.4c4.7-2.2,7.3-6.5,7.7-11.6c0.3-3.8-0.5-7.7-0.9-11.4c-0.4-3.5-0.8-7-1.8-10.4C306.8,297.7,306.1,297.9,306.2,298.4L306.2,298.4z"
                />
              </g>
            </g>
          </svg>
          <RaisedButton label="Return to Maps" onClick={() => this.props.handleReturnToMapsClick()} backgroundColor='#E94F37' labelColor='#F6F7EB' style={{width: '160px'}}/>
          <div>
            <Dialog
              modal={false}
              open={this.state.messageOpen}
              autoScrollBodyContent={true}
              bodyStyle={{backgroundImage: 'url("/assets/backgrounds/storyBG.jpg")', backgroundSize: '100% 100%', border: '0', filter: 'brightness(90%)'}}
            >
              <div className={styles.story_pop_up}>
                {this.changeName(this.state.puzzles.stories[this.props.map + this.state.completedQuests[this.state.completedQuests.length - 1]])}
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <RaisedButton label="Close" onClick={this.handleMessageClose.bind(this)} backgroundColor='#393E41' labelColor='rgb(255, 255, 255)' overlayStyle={{margin: 'auto'}}/>
              </div>
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
    } else if (this.state.clickedQuest) {
      return (
        <div>
          <Puzzle playerName={this.state.playerName} handleLifeChange={this.handleLifeChange.bind(this)} changeName={this.changeName.bind(this)} lives={this.state.lives} map={this.props.map} time={this.state.puzzles.time} handleReturntoMapClick={this.handleReturntoMapClick.bind(this)} questions={this.state.puzzles.questions} currentQuest={this.state.currentQuest} attempts={this.state.attempts} handlePuzzleSubmit={this.handlePuzzleSubmit.bind(this)} handleEnterClick={this.handleEnterClick.bind(this)} messages={this.state.puzzles.messages}/>
        </div>
      );
    }
  }
}

export default Map;
