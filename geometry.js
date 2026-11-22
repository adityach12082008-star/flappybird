const r = require("raylib");

const hasCollodedHorizontally = function (rec1, rec2) {
  const { x: x1, width: width1 } = rec1;
  const { x: x2, width: width2 } = rec2;
  return x1 + width1 >= x2 && x1 <= x2 + width2;
};
const hasCollidedVertically = function (rec1, rec2) {
  const { y: y1, height: height1 } = rec1;
  const { y: y2, height: height2 } = rec2;
  return y1 + height1 >= y2 && y1 <= y2 + height2;
};

const checkCollision = function (rec1, rec2) {
  return (
    hasCollodedHorizontally(rec1, rec2) && hasCollidedVertically(rec1, rec2)
  );
};

const isOutOfBounds = function (bird) {
  if (bird.y < 0 || bird.y + bird.height >= r.GetScreenHeight()) return true;
  return false;
};

module.exports = {
  checkCollision,
  isOutOfBounds,
};
