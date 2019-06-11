/**
* Genome is an object to hold all the DNA for reference in the utility function.
*/
export default class Genome {
  constructor(utilityThreshhold, distanceWeighting, heightWeighting, widthWeighting){
    this.utilityThreshhold = utilityThreshhold;
    this.distanceWeighting = distanceWeighting;
    this.heightWeighting = heightWeighting;
    this.widthWeighting = widthWeighting;

    this.fitness = 0;
  }

  /**
  * Returns the genome as an array. Useful for crossover functions.
  */
  getArray() {
    return [this.utilityThreshhold, this.distanceWeighting,
            this.heightWeighting, this.widthWeighting];
  }
}
