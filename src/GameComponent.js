import React, { useState, useEffect, useRef } from 'react';
import Game from './Game.js';


/**
* GameComponent is a React.js component, initialises and stores the game object,
* also holds a reference to the canvas that the game is being run on.
*/
const GameComponent = ({screen, sendGameData}) => {
  const [animationFrameId, setAnimationFrameId] = useState(0);
  const [gameObject, setGameObject] = useState({});
  const canvas = useRef(null);

  /**
  * This useEffect hook gets the context from the canvas and creates a new
  * Game inside it. The main game loop is called here and runs forever after
  * this component has been initialised (Mounted).
  */
  useEffect(() => {
    let ctx = canvas.current.getContext('2d');
    let game = new Game(ctx, screen);

    setAnimationFrameId(requestAnimationFrame(renderNext));
    setGameObject(game);

    function renderNext() {
      setAnimationFrameId(requestAnimationFrame(renderNext));
      game.update(ctx);
    }

  }, []);

  /**
  * This useEffect hook updates every time a new frame is called. It sends
  * data from the game object to the parent for visualisation.
  */
  useEffect(() => {
    let data = {
      score: gameObject.score,
      averageTopFitness: gameObject.averageTopFitness,
      iterations: gameObject.iterations,
      agentsLeft: gameObject.remainingAgents,
      topGenomes: gameObject.topGenomes
    }

    sendGameData(data);
  }, [animationFrameId]);


  return (
    <canvas ref={canvas}
      width={screen.width}
      height={screen.height}
    />
  )
};

export default GameComponent;
