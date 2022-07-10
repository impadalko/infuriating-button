const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const getRandomFromArray = (possibleValues) => {
  return possibleValues[getRandomInt(0, possibleValues.length)]
}

export default {
  getRandomInt,
  getRandomFromArray,
}
