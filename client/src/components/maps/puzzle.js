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
      equipped: []
    };
  }

  componentWillMount() {
    this.setState({
      playerName: this.props.playerName
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

  handleOpen() {
    this.setState({open: true});
  }

  handleTimer() {
    window.interval = null;
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
        <div style={{color: 'black', backgroundColor: 'white'}}>
          {this.state.time}
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
