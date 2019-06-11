import React, { useState } from 'react';
import GameComponent from './GameComponent.js';
import TopListComponent from './TopListComponent.js';
import GameInfoComponent from './GameInfoComponent.js';

/**
* Main React.js component for the project. Data state is used to store
* data from the game object and parse it to other react components.
*/
const App = () => {
  const [screen] = useState({ width: 300, height: 300 });
  const [data, setGameData] = useState({});

  return (
  <div>
    <GameInfoComponent
      score={data.score}
      iterations={data.iterations}
      topAverage={data.averageTopFitness}
      agentsLeft={data.agentsLeft}
      />
    <GameComponent
      screen = {screen}
      sendGameData={setGameData}/>
    <TopListComponent
      topGenomes={data.topGenomes}
      />
  </div>
  )
};

export default App;
