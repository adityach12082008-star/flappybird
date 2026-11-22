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

const spawnObstacle = function (tObstacle, bObstacle, lastObstacle, gap) {
  const { rec: lastObs } = lastObstacle;
  const { minGapX, maxGapX, gapV } = gap;

  const x = getRandom(lastObs.x + minGapX, lastObs.x + maxGapX);
  const height = getRandom(150, 650);

  tObstacle.push(createObstacle(x, 0, 40, height, r.RED));
  bObstacle.push(
    createObstacle(x, height + gapV, 40, 800 - height + gapV, r.RED),
  );
};

const handleObstacles = function (tObstacle, bObstacle, lastObs, gap) {
  spawnObstacle(tObstacle, bObstacle, lastObs, gap);
};

const generateRandom = function (tObstacle, bObstacle, gap) {
  if (tObstacle[0].rec.x < 600) {
    handleObstacles(tObstacle, bObstacle, tObstacle.at(-1), gap);
  }
};

const update = function (tObstacle, bObstacle, velocity, gap, dt) {
  moveObstacles(tObstacle, velocity, dt);
  moveObstacles(bObstacle, velocity, dt);
  generateRandom(tObstacle, bObstacle, gap);
};

module.exports = {
  createObstacle,
  drawObstacles,
  update,
};
