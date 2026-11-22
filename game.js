const geometry = require("./geometry.js");

const state = {
  isOver: false,
};

const checkIsOver = function (bird, obstacles) {
  if (geometry.isOutOfBounds(bird)) return true;
  for (const obstacle of obstacles)
    if (geometry.checkCollision(bird, obstacle.rec)) return true;

  return false;
};

module.exports = {
  state,
  checkIsOver,
};
