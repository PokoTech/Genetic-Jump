import Entity from './Entity.js';
import Utility from './Utility.js';

// Object of customisable Game Options.
import GAME_OPTIONS from './GAME_OPTIONS.js';

/**
* Holds all the unique properties of each obstacle. Obstacles start at the end
* of the screen and move leftward.
*/
export default class Obstacle extends Entity {
  constructor(properties){
    // Obstacle unique variables.
    super(properties.screen.width, properties.screen.height);

    this.height = Utility.randomInRange(properties.minHeight, properties.maxHeight);
    this.width = Utility.randomInRange(properties.minWidth, properties.maxWidth);

    if(GAME_OPTIONS.SPEED_VARIATION)
      this.speed = Utility.randomInRange(properties.minSpeed, properties.maxSpeed);
    else
      this.speed = properties.speed;

    this.y = properties.screen.height - this.height;
  }

  update() {
    this.x -= this.speed;
  }

  render(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
