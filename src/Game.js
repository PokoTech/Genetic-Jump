import Obstacle from './Obstacle.js';
import GeneticAlgorithm from './GeneticAlgorithm.js';
import Utility from './Utility.js';

// Object of customisable Game Options.
import GAME_OPTIONS from './GAME_OPTIONS.js'

/**
* Game object stores the main model of the game. Includes main update loop and
* behaviours that initialise and continuously run the game.
*/
export default class Game {
  /**
  * Create a new game.
  * @param {RenderingContext} context - context from current canvas element.
  * @param {object} screen - contains screen size variables.
  */
  constructor(context, screen){
    this.context = context;
    this.screen = screen;
    this.groups = { agents:[], obstacles:[], genomes:[] };

    this.sampleSize = GAME_OPTIONS.SAMPLE_SIZE;


    this.obstacleProperties = GAME_OPTIONS.OBSTACLE_PROPERTIES
    this.obstacleProperties.screen = this.screen;

    this.agentProperties = GAME_OPTIONS.AGENT_PROPERTIES;
    this.agentProperties.screen = this.screen;



    // React Component Accessable Variables
    this.animationFrameId = 0;
    this.score = 0;
    this.iterations = 1;
    this.averageTopFitness = 0;
    this.topGenomes = [];
    this.remainingAgents = this.sampleSize;

    this.initialiseNewGame();
  }

  /**
  * Creates initial objects and places them in their respective groups.
  */
  initialiseNewGame() {
    GeneticAlgorithm.generateRandomPopulation(this.sampleSize, this.agentProperties)
      .map(agent => this.createObject(agent, this.groups.agents));
    this.createObstacle();
  }

  /**
  * Main game loop.
  * Calls updates on each Entity, Checks for collision, calls Draw on this frame
  * then requests next frame from the browser renderer.
  * @param {RenderingContext} context - context from current canvas element.
  */
  update(context) {
    this.score++;
    // Update obstacles
    this.groups.obstacles.forEach(obstacle => {
      obstacle.update();
      if(obstacle.x <= -obstacle.width){
        this.kill(obstacle);
        this.createObstacle();
      }
    });

    // Update Agents.
    // Collision Detection.
    this.groups.agents.forEach(agent => {
      agent.update();
      this.groups.obstacles.forEach(obstacle => {
        // Perform Action Jump if utility function exceeds threshold.
        if(GeneticAlgorithm.utilityFunction(
            this.obstacleProperties,
            agent,
            Utility.distanceBetween(agent, obstacle),
            obstacle.width,
            obstacle.height) &&
            // Only pay attention to the obstacles on the right.
            obstacle.x >= agent.x){
              // Jump Action.
             agent.action_jump();
           }
        // Collision Checking.
        if(this.checkCollision(agent, obstacle)){
          agent.genome.fitness = this.score;
          this.createObject(agent.genome, this.groups.genomes);
          this.kill(agent);
          this.remainingAgents--;
        }
      });
    });

    // Check if all agents are dead
    if(!this.groups.agents.length){
      this.resetGame();
    }else{
      // Draw entities and request next frame.
      this.draw(context);
    }
  }

  /**
  * Draw each entity to canvas, and request next frame of animation.
  * @param {RenderingContext} context - context from current canvas element.
  */
  draw(context) {
    // Clear previous frame.
    context.clearRect(0, 0, this.screen.width, this.screen.height);
    // Draw new objects.
    this.groups.agents.forEach(agent => agent.render(context));
    this.groups.obstacles.forEach(obstacle => obstacle.render(context));
  }

  /**
  *
  */
  resetGame(){
    // Evolve successful genomes.
    let genomes = GeneticAlgorithm.reproduceGenomes(this.groups.genomes);
    GeneticAlgorithm.generateNewPopulation(this.sampleSize, this.agentProperties, genomes)
      .map(agent => this.createObject(agent, this.groups.agents))

    // Update all outwardBound variables.
    this.topGenomes = GeneticAlgorithm.rankFitness(Array.concat(this.topGenomes, this.groups.genomes)).slice(0,5);
    this.iterations === 1 ? this.averageTopFitness = this.score : this.averageTopFitness = Utility.movingAverage(this.averageTopFitness, this.score, this.iterations);
    this.iterations++;
    this.score = 0;
    this.remainingAgents = this.sampleSize;

    // Remove excess objects.
    this.groups.obstacles.forEach(obstacle => this.kill(obstacle))
    // Restarting the Obstacle loop.
    this.createObstacle();

    // // DEBUG:
    if(this.iterations <= 50)
      console.log(GeneticAlgorithm.rankFitness(this.groups.genomes)[0].fitness);

    this.groups.genomes = [];
  }

  /**
  * Checks collision between two supplied objects.
  * Uses bounding boxes, checking collision using coordinates of corners.
  * @param {object} object1 - first comparison object.
  * @param {object} object2 - second comparison object.
  * @return {boolean} whether or not the objects collided.
  */
  checkCollision(object1, object2) {
    return !((object1.y + object1.height) < object2.y ||
             (object1.x + object1.width)  < object2.x ||
             (object2.y + object2.height) < object1.y ||
             (object2.x + object2.width)  < object1.x);
  }

  /**
  * Removes reference of object from draw and update groups (this.groups).
  * @param {object} object - object for removal.
  */
  kill(object) {
    for(const key of Object.keys(this.groups)){
      this.groups[key] = this.groups[key].filter(item => item !== object);
    }
  }

  createObstacle(){
    this.createObject(new Obstacle(this.obstacleProperties), this.groups.obstacles);
  }

  /**
  * Pushes supplied object to chosen group.
  * @param {object} object - new entity to be added to game render queue.
  * @param {array} group - array in which the new object will be pushed to.
  */
  createObject(object, group) {
    group.push(object);
  }

}
