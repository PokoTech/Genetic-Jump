import React from 'react';

/**
* React.js component to display the top 5 genomes during this run of the algorithm.
*/
const TopListComponent = ({topGenomes = []}) => {

  return (
    <div id="TopGenomeChart">
      <div className="container">
        <div className="card">
          <h2>Rank</h2>
        </div>
        <div className="card">
          <h3>Distance Weighting</h3>
        </div>
        <div className="card">
          <h3>Height Weighting</h3>
        </div>
        <div className="card">
          <h3>Width Weighting</h3>
        </div>
        <div className="card">
          <h3>Utility Threshold</h3>
        </div>
        <div className="card">
          <h3>Fitness Rating</h3>
        </div>
      </div>
      {topGenomes.map((genome, index) => {
        return (
          <div className="container" key={index}>
            <div className="card">
              <p>{index}</p>
            </div>
            <div className="card">
              <p>{genome.distanceWeighting}</p>
            </div>
            <div className="card">
              <p>{genome.heightWeighting}</p>
            </div>
            <div className="card">
              <p>{genome.widthWeighting}</p>
            </div>
            <div className="card">
              <p>{genome.utilityThreshhold}</p>
            </div>
            <div className="card">
              <p>{genome.fitness}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopListComponent;
