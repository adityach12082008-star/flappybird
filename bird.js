const r = require("raylib");

function create(x, screenWidth, width, height, vVelocity, color) {
  const y = screenWidth / 2;
  const velocity = { x: 0, y: 0 };
  const isStarted = false;
  const birdVelocity = { x: 0, y: 400 };

  const rec = { x, y, width, height };

  return { rec, color, birdVelocity, velocity, isStarted };
}

function draw(bird) {
  r.DrawRectangleRec(bird.rec, bird.color);
}

function jump(bird, gravity, dt) {
  if (r.IsKeyPressed(r.KEY_SPACE)) {
    bird.velocity.y = bird.birdVelocity.y;
    bird.isStarted = true;
  }

  if (bird.isStarted) {
    bird.rec.y -= bird.velocity.y * dt;
    bird.velocity.y -= gravity * dt;
  }
}

const update = function (bird, gravity, dt) {
  jump(bird, gravity, dt);
};

module.exports = {
  create,
  draw,
  update,
};
