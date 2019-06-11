import React from 'react';

/**
* React.js Component, holds and displays the header information above the canvas.
*/
const GameInfoComponent = ({score = 0, iterations = 1, topAverage = 0, agentsLeft = 0}) => {

  return (
    <div>
      <h2>Fitness: {score}</h2>
      <h2>Average Top Fitness: {topAverage} </h2>
      <p>Iterations: {iterations} Remaining Agents : {agentsLeft}</p>
    </div>
  )
}

export default GameInfoComponent;
