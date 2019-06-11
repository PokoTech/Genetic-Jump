/**
* Superclass for all things drawn on screen. Just contains position.
*/
export default class Entity {
  constructor(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
  }
}
