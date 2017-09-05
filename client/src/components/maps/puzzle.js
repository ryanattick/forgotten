import React from 'react';

const Puzzle = (props) => {
  return (
    <div>
      <button onClick={() => props.handleReturntoMapClick()}>Return to Map</button>
      <div>
        {props.questions[props.currentQuest]}
      </div>
      <input onKeyUp={(e) => props.handleEnterClick(e)} type="text" id="puzzleAnswer"/>
      <button onClick={() => props.handlePuzzleSubmit()}>Submit</button>
    </div>
  );
};

export default Puzzle;
