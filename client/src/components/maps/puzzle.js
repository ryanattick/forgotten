import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.handleOpen();
  }

  handleOpen() {
    this.setState({open: true});
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
          >
            {this.props.messages[this.props.currentQuest]}
          </Dialog>
        </div>
        <button className="button" onClick={() => this.props.handleReturntoMapClick(true)}>Return to Map</button>
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
