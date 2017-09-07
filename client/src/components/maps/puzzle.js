import React from 'react';

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.refs.answerInput.focus();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.handleReturntoMapClick()}>Return to Map</button>
        <div>
          {this.props.questions[this.props.currentQuest]}
        </div>
        <input ref="answerInput" onKeyUp={(e) => this.props.handleEnterClick(e)} type="text" id="puzzleAnswer"/>
        <button onClick={() => this.props.handlePuzzleSubmit()}>Submit</button>
      </div>
    );
  }
}

export default Puzzle;
