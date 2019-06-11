
/**
* Normalisation calculation.
*/
function normalise(value, min, max){
  return (value - min) / (max - min);
}

/**
* Calculates the distance between two objects.
*/
function distanceBetween(object1, object2){
  return Math.abs(object1.x - object2.x);
}
/**
* Returns random float within range min (inclusive), max(exclusive).
*/
function randomInRange(min, max){
  return (Math.random() * (max - min)) + min;
}

/**
* Returns new moving average.
*/
function movingAverage(average, value, size){
  return average * ((size-1) / size) + (value / size);
}


let Utility = {
  normalise,
  distanceBetween,
  randomInRange,
  movingAverage
}

export default Utility;
