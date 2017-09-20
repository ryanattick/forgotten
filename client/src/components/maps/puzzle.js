import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Request from '../../../../helpers/requests';
import styles from '../../../../styles/maps/puzzle.css';

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      playerName: '',
      time: 30,
      equipped: [],
      attempts: 3
    };
  }

  componentWillMount() {
    this.setState({
      playerName: this.props.playerName,
      time: this.props.time[this.props.map + this.props.currentQuest]
    });
    Request.get('/puzzleItems', (data) => {
      this.setState({
        equipped: data
      });
    });
  }

  componentDidMount() {
    this.handleOpen();
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleTimer() {
    window.interval = null;
    if (this.state.time) {
      document.getElementById('timer').style.display = 'block';
      interval = setInterval(() => {
        this.setState({
          time: this.state.time - 1
        }, () => {
          if (this.state.time === 0) {
            Request.post('/lives', {lives: this.props.lives - 1}, function(data) {
              console.log(data);
            });
            this.props.handleLifeChange(this.props.lives - 1);
            this.props.handleReturntoMapClick(true);
            clearInterval(interval);
          }
        });
      }, 1000);
    } else {
      // document.getElementById('timer').style.display = 'none';
      document.getElementById('attempts').style.display = 'block';
    }
  }

  handleItemUsage() {
    // this.setState({
    //   time: this.state.time + 30
    // });
  }

  handleClose() {
    this.setState({open: false});
    this.refs.answerInput.focus();
    this.handleTimer();
  }
  render() {
    const actions = [
      <RaisedButton
        label="Close"
        primary={true}
        buttonStyle={{backgroundColor: '#F6F7EB'}}
        labelStyle={{color: '#3F88C5'}}
        onClick={this.handleClose.bind(this)}
      />
    ];

    return (
      <div>
        <div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose.bind(this)}
            paperClassName={styles.message}
            bodyStyle={{color: 'white', fontFamily: 'monospace', fontSize: '2vw'}}
          >
            {this.props.changeName(this.props.messages[this.props.map + this.props.currentQuest])}
          </Dialog>
        </div>
        <div style={{color: 'black', backgroundColor: 'white'}}>{`Lives Remaining ${this.props.lives}`}</div>
        <RaisedButton className="button" label="Return to Map" onClick={() => this.props.handleReturntoMapClick(true)} backgroundColor='#E94F37' labelColor='#F6F7EB' style={{width: '160px'}}/>
        <div id='timer' style={{display: 'none', color: 'black', backgroundColor: 'white'}}>
          {`Time Remaining: ${this.state.time} seconds`}
        </div>
        <div id='attempts' style={{display: 'none', color: 'black', backgroundColor: 'white'}}>
          {`Attempts Remaining: ${this.props.attempts}`}
        </div>
        <div style={{color: '#E94F37'}}>
          {this.props.questions[this.props.map + this.props.currentQuest]}
        </div>
        <input ref="answerInput" onKeyUp={(e) => this.props.handleEnterClick(e)} type="text" id="puzzleAnswer"/>
        <button onClick={() => this.props.handlePuzzleSubmit()}>Submit</button>
      </div>
    );
  }
}

export default Puzzle;
