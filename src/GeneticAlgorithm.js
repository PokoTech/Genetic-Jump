import Genome from './Genome.js';
import Agent from './Agent.js';
import Utility from './Utility.js';

// Object of customisable Game Options.
import GAME_OPTIONS from './GAME_OPTIONS.js';


/**
* Calls a series of methods to evolve the genomes in the array.
*/
function reproduceGenomes(genomeArray){

  // Get list of parents
  let parents = rankFitness(genomeArray);
  if(GAME_OPTIONS.WEIGHTED_PARENTS)
    parents = weightedRandomPairing(parents);


  // Mate parents top to bottom (sorting done in parents get methods).
  let newPopulation = [];
  for (let index = 0; index < parents.length; index+=2){
    newPopulation.push(...mate(parents[index].getArray(),
                            parents[index+1].getArray()));
  }


  // Mutate genomes at a low rate.
  if(GAME_OPTIONS.MUTATION)
    newPopulation.forEach(genome => {
      if(Utility.randomInRange(0,1) < 0.05)
        genome = mutate(genome);
    });

  return newPopulation;
}


/**
* Roulette wheel approach for choosing parents. Uses weighted random choice
* (Higher fitness, bigger chance of being chosen).
* @param {array} genomeArray - an array of genomes with fitness ratings.
*
*/
function weightedRandomPairing(genomeArray){

  let fitnessTotal = 0;
  genomeArray.forEach(genome => fitnessTotal += genome.fitness);

  let selectedParents = [];
  while (selectedParents.length !== genomeArray.length) {
    let selector = Utility.randomInRange(0, fitnessTotal);
    let partialTotal = 0;
    let selectedGenome = null;

    genomeArray.forEach(genome => {
      partialTotal += genome.fitness;
      if(partialTotal >= selector && !selectedGenome)
        selectedGenome = genome;
    });

    selectedParents.push(selectedGenome);
  }

  return selectedParents;
}

/**
* Crossover function between genomes. Uses one random point crossover.
*/
function mate(father, mother){
  // crossover point.
  let point = Math.floor(Utility.randomInRange(1, father.length));
  let child1 = Array.concat(mother.slice(0, point), father.slice(point));
  let child2 = Array.concat(father.slice(0, point), mother.slice(point));

  return [new Genome(...child1), new Genome(...child2)];
}

/**
* Mutates a genome by mating it with a randomly generated genome.
*/
function mutate(genome){
  return mate(genome.getArray(), generateGenome().getArray())[0];
}

/**
* Returns the array sorted by fitness rating.
*/
function rankFitness(genomeArray){
  return genomeArray.sort((a, b) => b.fitness - a.fitness);
}

/**
* Called on all agents every frame.
* Determines utility of an action by calculating genome weightings with obstacle
* properties.
* @param {Agent} agent - genome object containing weightings from the agent.
* @param {float} o_distance - distance between agent and obstacle.
* @param {float} o_height - height of obstacle.
* @param {float} o_width - width of obstacle.
* @return {boolean} returns true if action exceeds utilityThreshhold.
*/
function utilityFunction(gameProperties, agent, o_distance, o_width, o_height){
  // Destructuring supplied parameters.
  const { maxWidth, minWidth, maxHeight, minHeight } = gameProperties;
  const { utilityThreshhold, distanceWeighting,
          heightWeighting, widthWeighting } = agent.genome;

  // Calculate normalised utilites
  let distanceUtility =  Utility.normalise(o_distance, 0, (gameProperties.screen.width - agent.x));
  let widthUtility = Utility.normalise(o_width, minWidth, maxWidth);
  let heightUtility = Utility.normalise(o_height, minHeight, maxHeight);
  // Weigh utilities and calculate average
  let utilityAverage = ((distanceUtility * distanceWeighting) +
                        (heightUtility * heightWeighting) +
                        (widthUtility * widthWeighting)) / 3;

  return utilityThreshhold >= utilityAverage;
}

/**
* @return {Genome} returns a new genome object.
*/
function generateGenome(){
  return new Genome(Utility.randomInRange(-1, 1), Utility.randomInRange(-1, 1),
                    Utility.randomInRange(-1, 1), Utility.randomInRange(-1, 1));
}

/**
* Generates an array of agents based on the template agent object provided.
* @param {float} size - size of population to be generated.
* @param {object} agentTemplate - default values for each generated agent.
* @return {array} returns filled array of generated agents.
*/
function generateRandomPopulation(size, agentProperties){
  return Array(size).fill().map(agent => new Agent(agentProperties, GeneticAlgorithm.generateGenome()));
}

function generateNewPopulation(size, agentProperties, genomeArray){
  let agentArray = []
  genomeArray.forEach(genome => {
    agentArray.push(new Agent(agentProperties, genome));
  });

  return agentArray;
}

/*
* A set of functions used for applying the genetic algorithm
*/
let GeneticAlgorithm = {
  reproduceGenomes,
  utilityFunction,
  generateGenome,
  generateRandomPopulation,
  generateNewPopulation,
  rankFitness
};

export default GeneticAlgorithm;
