const r = require("raylib");

const createObstacle = function (x, y, width, height, color) {
  const rec = { x, y, width, height };

  return { rec, color };
};

const draw = function (obstacle) {
  const { rec, color } = obstacle;
  r.DrawRectangleRec(rec, color);
};

const drawObstacles = function (tObstacle) {
  for (const obstacle of tObstacle) draw(obstacle, tObstacle);
};

const moveObstacles = function (tObstacle, velocity, dt) {
  const { horizontal: hVelocity } = velocity;

  for (const obstacle of tObstacle) {
    const { rec } = obstacle;
    rec.x -= hVelocity * dt;
  }
};

const getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

const generateRandomObstacle = function (tObstacle, bObstacle, lastObstacle) {
  const { rec: lastObs } = lastObstacle;

  const x = getRandom(lastObs.x + 300, lastObs.x + 500);
  const height = getRandom(150, 650);

  tObstacle.push(createObstacle(x, 0, 40, height, r.RED));
  bObstacle.push(
    createObstacle(x, height + 175, 40, 800 - height + 175, r.RED),
  );
};

const handleObstacles = function (tObstacle, bObstacle, lastObs) {
  generateRandomObstacle(tObstacle, bObstacle, lastObs);
};

const generateRandom = function (tObstacle, bObstacle) {
  if (tObstacle[0].rec.x < 600) {
    handleObstacles(tObstacle, bObstacle, tObstacle.at(-1));
  }
};

const update = function (tObstacle, bObstacle, velocity, dt) {
  moveObstacles(tObstacle, velocity, dt);
  moveObstacles(bObstacle, velocity, dt);
  generateRandom(tObstacle, bObstacle);
};

module.exports = {
  createObstacle,
  drawObstacles,
  update,
};
