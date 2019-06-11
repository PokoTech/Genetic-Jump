/**
* This is an object to turn on/off game options.
* Originally going to be accessible from the GUI.
*
* You can change options here and refresh to change the behaviour of the
* algorithm.
*/

let GAME_OPTIONS = {
    // Amount of agents on screen at one time. (Default: 500, must be even)
    SAMPLE_SIZE: 500,

    // Enable / Disable Weighted Parents. (Default: true)
    // Alternative to Weighted parents is ranked and mated from top to bottom.
    WEIGHTED_PARENTS: true,

    // Enable / Disable Mutation. (Default: true)
    MUTATION: true,

    // Enable / Disable speed variation. (Default: false)
    SPEED_VARIATION: false,

    // Properties of each Agent.
    AGENT_PROPERTIES: {
      width:  30,  // (Default: 30)
      height: 60,  // (Default: 60)
      xpos:   40,  // (Default: 40)
      ypos:   150, // (Default: 150)
      jumpHeight: 4.2, // (Default: 4.2)
      gravity:    0.1 // (Default: 0.1)
    },

    // Properties of the generated obstacles to jump over.
    OBSTACLE_PROPERTIES: {
      maxWidth: 50,  // (Default: 50)
      minWidth: 30,  // (Default: 30)
      maxHeight: 40, // (Default: 40)
      minHeight: 20, // (Default: 20)
      speed:    2, // (Default: 2)
      maxSpeed: 3, // (Default: 3)
      minSpeed: 1  // (Default: 1)
    }

}

export default GAME_OPTIONS;
