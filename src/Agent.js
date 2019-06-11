import Entity from './Entity.js';


/**
* Agent objects stores all the properties unique to each agent. The agent also
* recieves a unique genome to share mate with during reproduction.
*/
export default class Agent extends Entity {
  constructor(properties, genome) {
    // Agent unique variables.
    super(properties.xpos, properties.ypos);
    this.width = properties.width;
    this.height = properties.height;
    this.screen = properties.screen;

    // Determines weightings on actions
    this.genome = genome;
    // Agent variables.
    this.jumpHeight = properties.jumpHeight;
    this.gravity = properties.gravity;
    this.speed = 0;

    this.grounded = false;
  }

  update() {
    // Modify speed variable.
    if(this.y + this.height >= this.screen.height){
      // If the agent is touching the ground.
      this.grounded = true;
      if(this.speed > 0) this.speed = 0;
    } else {
      // If the agent is in the air, accelerate with gravity.
      this.grounded = false;
      this.speed += this.gravity;
    }

    // Apply speed variable.
    this.y += this.speed;
  }

  render(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  // Set actions
  action_jump() {
    if(this.grounded)
      this.speed = -this.jumpHeight;
  }
}
