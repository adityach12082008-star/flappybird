const r = require("raylib");

const create = function (x, y, width, height, color) {
  const rec = { x, y, width, height };

  return { rec, color };
};

const drawObstacle = function ({ rec, color }) {
  r.DrawRectangleRec(rec, color);
};

const draw = function (obstacles) {
  for (const obstacle of obstacles) drawObstacle(obstacle, obstacles);
};

const moveObstacles = function (obstacles, { horizontal: hVelocity }, dt) {
  for (const obstacle of obstacles) {
    const { rec } = obstacle;
    rec.x -= hVelocity * dt;
  }
};

const getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

const spawnObstacle = function (
  tObstacle,
  bObstacle,
  { rec: lastObs },
  spawnData,
  color,
) {
  const { minGapX, maxGapX, minH, maxH, gapV } = spawnData;

  const x = getRandom(lastObs.x + minGapX, lastObs.x + maxGapX);
  const height = r.GetRandomValue(minH, maxH);

  tObstacle.push(create(x, 0, lastObs.width, height, color));
  bObstacle.push(
    create(
      x,
      height + gapV,
      lastObs.width,
      r.GetScreenHeight() - height + gapV,
      color,
    ),
  );
};

const handleObstacles = function (
  tObstacle,
  bObstacle,
  lastObs,
  spawnData,
  color,
) {
  spawnObstacle(tObstacle, bObstacle, lastObs, spawnData, color);
};

const generateRandom = function (tObstacle, bObstacle, spawnData, color) {
  const { spawnPoint } = spawnData;
  if (tObstacle[0].rec.x < spawnPoint) {
    handleObstacles(tObstacle, bObstacle, tObstacle.at(-1), spawnData, color);
  }
};

const update = function (tObstacle, bObstacle, velocity, spawnData, color, dt) {
  moveObstacles(tObstacle, velocity, dt);
  moveObstacles(bObstacle, velocity, dt);
  generateRandom(tObstacle, bObstacle, spawnData, color);
};

module.exports = {
  create,
  draw,
  update,
};
