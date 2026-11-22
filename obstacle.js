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

const spawnObstacle = function (tObstacle, bObstacle, lastObstacle, spawnData) {
  const { rec: lastObs } = lastObstacle;
  const { minGapX, maxGapX, minH, maxH, gapV } = spawnData;

  const x = getRandom(lastObs.x + minGapX, lastObs.x + maxGapX);
  const height = getRandom(minH, maxH);

  tObstacle.push(createObstacle(x, 0, lastObs.width, height, r.RED));
  bObstacle.push(
    createObstacle(
      x,
      height + gapV,
      lastObs.width,
      r.GetScreenHeight() - height + gapV,
      r.RED,
    ),
  );
};

const handleObstacles = function (tObstacle, bObstacle, lastObs, spawnData) {
  spawnObstacle(tObstacle, bObstacle, lastObs, spawnData);
};

const generateRandom = function (tObstacle, bObstacle, spawnData) {
  const { spawnPoint } = spawnData;
  if (tObstacle[0].rec.x < spawnPoint) {
    handleObstacles(tObstacle, bObstacle, tObstacle.at(-1), spawnData);
  }
};

const update = function (tObstacle, bObstacle, velocity, spawnData, dt) {
  moveObstacles(tObstacle, velocity, dt);
  moveObstacles(bObstacle, velocity, dt);
  generateRandom(tObstacle, bObstacle, spawnData);
};

module.exports = {
  createObstacle,
  drawObstacles,
  update,
};
