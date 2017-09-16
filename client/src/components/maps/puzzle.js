import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      playerName: '',
      time: 30
    };
  }

  componentWillMount() {
    this.setState({
      playerName: this.props.playerName
    })
  }

  componentDidMount() {
    this.handleOpen();
    // this.handleTimer();
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleTimer() {
    var interval = null;
    interval = setInterval(() => {
      this.setState({
        time: this.state.time - 1
      }, () => {
        if (this.state.time === 0) {
          this.props.handleReturntoMapClick();
          clearInterval(interval);
        }
      });
    }, 1000);
  }

  handleClose() {
    this.setState({open: false});
    this.refs.answerInput.focus();
  }
  render() {
    const actions = [
      <RaisedButton
        label="Go to the Puzzle"
        primary={true}
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
            overlayStyle={{backgroundImage: 'url("https://i.imgur.com/5HnPoOE.png")', borderRadius: '10px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', margin: 'auto'}}
            bodyStyle={{backgroundColor: '#3CABFA', color: 'white', margin: '20px', borderRadius: '10px 10px 10px 0'}}
            actionsContainerStyle={{backgroundColor: 'whie', marginRight: '10px'}}
          >
            {this.props.changeName(this.props.messages[this.props.currentQuest])}
          </Dialog>
        </div>
        <RaisedButton className="button" label="Return to Map" onClick={() => this.props.handleReturntoMapClick(true)} backgroundColor='#E94F37' labelColor='#F6F7EB' style={{width: '160px'}}/>
        {/* <div style={{color: 'black'}}>
          {this.state.time}
        </div> */}
        <div style={{color: '#E94F37'}}>
          {this.props.questions[this.props.currentQuest]}
        </div>
        <input ref="answerInput" onKeyUp={(e) => this.props.handleEnterClick(e)} type="text" id="puzzleAnswer"/>
        <button onClick={() => this.props.handlePuzzleSubmit()}>Submit</button>
      </div>
    );
  }
}

export default Puzzle;
