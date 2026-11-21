const r = require("raylib");
const b = require("./bird.js");
const o = require("./obstacle.js");

const running = function () {
  return !r.WindowShouldClose();
};

const setup = function () {
  const screen = {
    WIDTH: 800,
    HEIGHT: 800,
    FPS: 60,
    targetFPS: 60,
  };

  r.SetTraceLogLevel(r.LOG_NONE);

  r.InitWindow(screen.WIDTH, screen.HEIGHT, "Flappy Bird");
  r.SetTargetFPS(screen.FPS);

  const gravity = 0.6 * screen.targetFPS * screen.targetFPS;

  const obstacle = o.createObstacle(400, 0, 40, 300, r.RED);
  const bird = b.createBird(40, screen.WIDTH, 32, 48, 500, r.BLUE);

  return { bird, gravity, obstacle };
};

const update = function (w) {
  const { bird, obstacle, gravity } = w;

  const dt = r.GetFrameTime();
  b.jump(bird, gravity, dt);
  obstacle.rec.x -= 4;
};

const draw = function (w) {
  const { bird, obstacle } = w;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  b.drawBird(bird);
  o.draw(obstacle);

  r.EndDrawing();
};

const teardown = function () {
  r.CloseWindow();
};

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
