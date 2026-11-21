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

const update = function (obstacles, velocity, dt) {
  moveObstacles(obstacles, velocity, dt);
};

module.exports = {
  createObstacle,
  drawObstacles,
  update,
};
