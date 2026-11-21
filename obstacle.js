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

const moveObstacles = function (obstacles) {
  for (const obstacle of obstacles) obstacle.rec.x -= 4;
};

module.exports = {
  createObstacle,
  drawObstacles,
  draw,
  moveObstacles,
};
