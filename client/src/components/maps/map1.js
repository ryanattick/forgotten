import React from 'react';
import Puzzle from './puzzle.js';
import styles from '../../../../styles/maps/map.css';
import $ from 'jquery';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Request from '../../../../helpers/requests';

class Map1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsRemaining: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      completedQuests: [],
      currentQuest: '0',
      greenclickedQuest: null,
      currentQuestBeforeGreenClick: null,
      clickedQuest: false,
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
        }
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
      messageOpen: false,
      storyOpen: false
    };
  }
  componentWillMount() {
    if (this.props.currentPuzzleNum >= 10) {
      this.setState({
        completedQuests: ['0'].concat(this.state.levelsRemaining),
        levelsRemaining: [],
        currentQuest: '10'
      }, () => {
        this.colorPuzzles();
      });
    } else if (this.props.currentPuzzleNum.toString() !== '0') {
      this.setState({
        currentQuest: this.props.currentPuzzleNum.toString()[0],
        completedQuests: ['0'].concat(this.state.levelsRemaining.slice(0, this.props.currentPuzzleNum)),
        levelsRemaining: this.state.levelsRemaining.slice(this.props.currentPuzzleNum)
      }, () => {
        this.colorPuzzles();
      });
    }
    Request.get('/puzzleData', (data) => {
      this.setState({
        puzzles: data
      });
    });
  }

  componentDidMount() {
    if (!this.state.completedQuests.length) {
      this.handleStoryOpen();
    }
  }

  colorPuzzles() {
    for (var i = 0; i < this.state.completedQuests.length; i++) {
      document.getElementById(this.state.completedQuests[i]).style.fill = 'green';
    }
    if (this.state.currentQuest && parseInt(this.state.currentQuest) < 10) {
      document.getElementById(this.state.currentQuest).style.fill = 'red';
    }
  }

  handleMapQuestClick(e) {
    if (e.target.style.fill === 'green') {
      this.setState({
        greenclickedQuest: e.target.id,
        currentQuestBeforeGreenClick: this.state.currentQuest,
        currentQuest: e.target.id,
        clickedQuest: true
      });
    } else if (e.target.id === this.state.currentQuest) {
      this.setState({
        clickedQuest: true
      });
    }
  }

  handleReturntoMapClick() {
    if (this.state.greenclickedQuest) {
      this.setState({
        greenclickedQuest: null,
        currentQuest: this.state.currentQuestBeforeGreenClick
      });
    }
    this.setState({
      clickedQuest: false
    }, function() {
      this.colorPuzzles();
    });
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
      } else {
        this.state.completedQuests.push(this.state.currentQuest);
        var current = this.state.currentQuest;
        this.setState({
          currentQuest: this.state.levelsRemaining[0],
          levelsRemaining: this.state.levelsRemaining.slice(1)
        }, function() {
          this.colorPuzzles();
          if (this.state.currentQuest === '9') {
            Request.post('/mapData', {level: parseInt(this.state.currentQuest) + 1}, (data) => {
            });
          } else {
            Request.post('/mapData', {level: parseInt(this.state.currentQuest)}, (data) => {
            });
          }
          this.handleMessageOpen();
        });
      }
      if (this.state.levelsRemaining.length === 0 && !this.state.greenclickedQuest) {
        this.props.handleMapFinished();
      } else {
        this.handleReturntoMapClick();
      }
    } else {
      document.getElementById('puzzleAnswer').value = '';
    }
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
  }

  handleStoryOpen() {
    this.setState({storyOpen: true});
  }

  handleStoryClose() {
    this.setState({storyOpen: false});
  }

  render() {
    const messageActions = [
      <RaisedButton
        label="Continue to map"
        primary={true}
        onClick={this.handleMessageClose.bind(this)}
      />
    ];
    const storyActions = [
      <RaisedButton
        label="Continue to map"
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
              onRequestClose={this.handleStoryClose.bind(this)}
            >
              Your head is pounding. You reach up to touch it and as you do you realize you can’t tell if your eyes are open or closed. This startles you and you freeze. Where are you? You don’t know. Who are you? You can’t remember. Your heart starts racing as panic creeps in, slowly at first and then all at once. You take a breath and try to think back. How did you get here? Where is here? You decide to take things one step at a time. What is your name? As soon as that thought enters your mind you feel a vibration in your pocket.
            </Dialog>
          </div>
          <button onClick={() => this.props.handleReturnToMapsClick()}>Return to Maps</button>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 436 290" style={{width: '800px', enableBackground: 'new 0 0 436 290'}} xmlSpace="preserve">
            <image style={{'overflow': 'visible'}} width="580" height="386" xlinkHref="https://i.pinimg.com/736x/72/03/7a/72037a6578a6747fd6f6ce4e68e680a8--basement-bedrooms-basements.jpg" transform="matrix(0.7517 0 0 0.7513 0 0)">
            </image>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M151.4,211.8c10,15.4,32.2,18.4,49,19.8c23.9,2,44.5-14.8,63.9-26.4c1.7-1,0.1-3.6-1.5-2.6c-9.1,5.5-18.2,11.1-27.4,16.4c-9.7,5.5-19.8,10.1-31.2,9.8c-9.3-0.2-19-2.1-27.9-4.5c-8.8-2.4-17.2-6.3-22.3-14.1C153,208.6,150.4,210.1,151.4,211.8L151.4,211.8z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="st1" style={{fill: '#231F20'}} d="M43,192.5c1.9,0,1.9-3,0-3C41.1,189.5,41.1,192.5,43,192.5L43,192.5z"/>
              </g>
            </g>
            <line className="st2" style={{fill: 'none', stroke: '#000000', strokeMiterlimit: '10'}} x1="-0.5" y1="-0.5" x2="-0.5" y2="290.5"/>
            <line className="st2" style={{fill: 'none', stroke: '#000000', strokeMiterlimit: '10'}} x1="436.5" y1="-0.5" x2="436.5" y2="290.5"/>
            <line className="st2" style={{fill: 'none', stroke: '#000000', strokeMiterlimit: '10'}} x1="-0.5" y1="-0.5" x2="-0.5" y2="290.5"/>
            <line className="st2" style={{fill: 'none', stroke: '#000000', strokeMiterlimit: '10'}} x1="436.5" y1="290.5" x2="-0.5" y2="290.5"/>
            <line className="st2" style={{fill: 'none', stroke: '#000000', strokeMiterlimit: '10'}} x1="-0.5" y1="-0.5" x2="436.5" y2="-0.5"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M130.8,208.1c-6.3-7.3-17.6-0.8-21.7,5.7c-3,4.7-3.8,10.4-3,15.8c0.4,2.5,1,4.9,2,7.2c1.7,4.1,5.4,8.1,4.3,12.8c-0.4,1.9,2.5,2.7,2.9,0.8c0.7-3.3,0-5.9-1.5-8.9c-2.5-5-4.9-9.5-5.1-15.3c-0.1-5.1,1.6-10.2,5.3-13.8c3.5-3.5,10.6-6.8,14.6-2.2C130,211.7,132.1,209.6,130.8,208.1L130.8,208.1z"/>
              </g>
            </g>
            <circle className="st3" id="7" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="142.2" cy="199.9" r="15.6"/>
            <circle className="st3" id="0" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'red', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="40.2" cy="194.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M42,179.7c4.2-9,11.3-16.3,20.4-20.5c11.3-5.3,24.2-4.3,35.8-0.6c4.6,1.5,9,3.1,13.7,1.1c3.7-1.6,6.5-4.9,8.9-8c6-7.8,9.5-16.9,10.8-26.6c0.3-1.9-2.7-1.9-3,0c-1.4,10.7-6.1,22.1-14.3,29.4c-6.2,5.6-12.7,1.7-19.5,0c-5-1.3-10.2-2-15.3-1.9c-17.2,0.2-32.7,10.1-40,25.7C38.6,180,41.2,181.5,42,179.7L42,179.7z"/>
              </g>
            </g>
            <circle className="st3" id="1" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="130.2" cy="108.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M114.9,103.6c-4.9-3.5-10.3-5.8-16.3-6.6c-5.6-0.7-16.1,2.5-19.5-3.4c-4.7-8.1,5.7-14.8,11.1-18.6c4.2-2.9,8.1-6,10.3-10.8c0.3-0.8,0.2-1.6-0.5-2.1c-3.8-2.4-7.4-5-10.8-8c-1.4-1.3-3.6,0.8-2.1,2.1c3.6,3.1,7.3,5.9,11.4,8.4c-0.2-0.7-0.4-1.4-0.5-2.1c-4.8,10.6-27.5,15.9-22.1,30.9c2,5.6,7.8,6.6,13.2,6.4c9.1-0.3,16.8,0.6,24.4,6.2C114.9,107.4,116.4,104.8,114.9,103.6L114.9,103.6z"/>
              </g>
            </g>
            <circle className="st3" id="2" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="76.2" cy="44.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M92.9,41.6c11.3-2.2,22.6-4.7,33.9-6.5c10.9-1.7,21.2-0.8,30.4,5.8c15.3,11,20.1,28.9,26.4,45.6c5.4,14.1,15,26.4,31.5,25.9c8.2-0.2,16.2-3.2,23.2-7.4c6.8-4.1,14.3-9.6,17.9-16.9c4.5-8.9,0.2-17.7-4-25.8c-5.7-10.9-12.3-21.2-19.6-31c-1.1-1.5-3.7,0-2.6,1.5c5.9,7.9,11.3,16,16.1,24.6c5,8.9,12.9,20.4,6.8,30.6c-4.5,7.6-13.1,13.4-21,17.1c-8.1,3.8-17.7,6-26.5,2.9c-16.9-5.8-19.6-26.4-25.5-40.8c-5.4-13.1-14.1-26.3-27.3-32.5c-7.9-3.8-16.3-4.1-24.8-2.8c-12,1.7-23.9,4.5-35.8,6.7C90.2,39.1,91,42,92.9,41.6L92.9,41.6z"/>
              </g>
            </g>
            <circle className="st3" id="3" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="227.2" cy="23.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M244,24.3c46-4.8,84.7,30.9,103.3,69.9c5,10.5,8.5,23,4.6,34.4c-3.3,9.4-11.2,16-19.9,20.3c-8.9,4.5-18.8,7-28.5,9.1c-12.3,2.7-24.8,4.6-37.5,4.7c-25.1,0.2-50.7-7.2-68.3-25.8c-1.3-1.4-3.4,0.7-2.1,2.1c15.8,16.8,38.2,25,60.9,26.5c13.5,0.9,27-0.5,40.3-3c11.1-2.1,22.4-4.7,32.9-9.2c8.6-3.7,16.8-9.1,21.9-17.1c5.7-9.1,6-20.1,3.3-30.3c-3.1-11.5-9.3-22.2-15.9-32c-6.4-9.5-13.7-18.4-22.2-26.1c-19.7-18-45.8-29.3-72.7-26.5C242.1,21.5,242,24.5,244,24.3L244,24.3z"/>
              </g>
            </g>
            <circle className="st3" id="4" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="187.2" cy="124.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M174.6,137.6c0.7,4.4-2.6,7.8-4.5,11.3c-1.3,2.5-2.2,5.2-2.3,8c-0.3,5.7,1.8,11.1,5,15.7c3.5,5,8.1,9.1,13,12.8c4.7,3.6,9.6,7.1,15.9,6.6c1.9-0.1,1.9-3.1,0-3c-6.8,0.5-12.5-4.5-17.4-8.6c-4.4-3.7-8.6-8-11.1-13.2c-3.3-6.8-2.7-13.1,1.1-19.4c2.2-3.6,3.9-6.8,3.2-11.1C177.2,134.9,174.3,135.7,174.6,137.6L174.6,137.6z"/>
              </g>
            </g>
            <circle className="st3" id="5" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="218.2" cy="194.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M235.1,193.7c16.9-11.6,37.7-12.7,57.5-11.5c8.1,0.5,22.2,0,28,7c4.4,5.3-4,10.9-8,13.6
                c-5.3,3.5-11.9,5.1-17.8,1.8c-1.7-0.9-3.2,1.7-1.5,2.6c11.1,6.2,22.1-1.8,29.9-9.5c8.8-8.7-6.8-15.4-14-16.8c-12.4-2.5-26.1-2.7-38.7-1.7c-13.1,1-25.9,4.4-36.8,11.9C232,192.2,233.5,194.8,235.1,193.7L235.1,193.7z"/>
              </g>
            </g>
            <circle className="st3" id="6" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="279.2" cy="202.9" r="15.6"/>
            <g>
              <g>
                <path className="st0" style={{fill: '#ED1C24'}} d="M127.3,275.4c33.3-1.8,66.4-2.9,99.7-0.7c25.4,1.7,55.8,1,71.7-22.5c1.1-1.6-1.5-3.1-2.6-1.5c-16.9,25-50.6,22.2-76.9,20.5c-30.7-2-61.4-0.4-92,1.2C125.4,272.5,125.4,275.5,127.3,275.4L127.3,275.4z"/>
              </g>
            </g>
            <circle className="st3" id="9" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="304.2" cy="239.9" r="15.6"/>
            <circle className="st3" id="8" onClick={(e) => this.handleMapQuestClick(e)} style={{fill: 'grey', stroke: '#ED1C24', strokeLinecap: 'round', strokeMiterlimit: '10'}} cx="111.2" cy="266.9" r="15.6"/>
          </svg>
          <div>
            <Dialog
              actions={messageActions}
              modal={false}
              open={this.state.messageOpen}
              onRequestClose={this.handleMessageClose.bind(this)}
            >
              {this.state.puzzles.stories[this.state.completedQuests[this.state.completedQuests.length - 1]]}
              {/* {`Congrats you have just completed level ${this.state.currentQuest}`} */}
            </Dialog>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Puzzle handleReturntoMapClick={this.handleReturntoMapClick.bind(this)} questions={this.state.puzzles.questions} currentQuest={this.state.currentQuest} handlePuzzleSubmit={this.handlePuzzleSubmit.bind(this)} handleEnterClick={this.handleEnterClick.bind(this)} messages={this.state.puzzles.messages}/>
        </div>
      );
    }
  }
}

export default Map1;
