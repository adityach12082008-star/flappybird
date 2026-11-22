const r = require("raylib");

const createObstacle = function (x, y, width, height, color) {
  const rec = { x, y, width, height };

  return { rec, color };
};

const draw = function (obstacle) {
  const { rec, color } = obstacle;
  r.DrawRectangleRec(rec, color);
  r.DrawRectangle(
    rec.x,
    rec.height + 175, // 175 is gap
    rec.width,
    800 - rec.height + 175, // 175 is gap
    color,
  );
};

const drawObstacles = function (obstacles) {
  for (const obstacle of obstacles) draw(obstacle);
};

const moveObstacles = function (obstacles, velocity, dt) {
  const { horizontal: hVelocity } = velocity;

  for (const obstacle of obstacles) {
    const { rec } = obstacle;
    rec.x -= hVelocity * dt;
  }
};

const getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

const generateRandomObstacle = function (obstacles, lastObstacle) {
  const { rec: lastObs } = lastObstacle;

  const x = getRandom(lastObs.x + 300, lastObs.x + 500);
  const height = getRandom(150, 650);

  obstacles.push(createObstacle(x, 0, 40, height, r.RED));
};

const handleObstacles = function (obstacles, lastObs) {
  generateRandomObstacle(obstacles, lastObs);
};

const generateRandom = function (obstacles) {
  if (obstacles[0].rec.x < 600) {
    handleObstacles(obstacles, obstacles.at(-1));
  }
};

const update = function (obstacles, velocity, dt) {
  moveObstacles(obstacles, velocity, dt);
  generateRandom(obstacles);
};

module.exports = {
  createObstacle,
  drawObstacles,
  update,
};
