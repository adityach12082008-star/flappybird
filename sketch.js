const r = require("raylib");
const b = require("./bird.js");

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

  const obstVel = 3 * screen.targetFPS;
  const gravity = 0.6 * screen.targetFPS * screen.targetFPS;

  const bird = b.createBird(40, screen.WIDTH, 32, 48, 500, r.BLUE);

  return { bird, gravity };
};

const update = function (w) {
  const { bird, gravity } = w;

  const dt = r.GetFrameTime();
  b.jump(bird, gravity, dt);
};

const draw = function (w) {
  const { bird } = w;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  b.drawBird(bird);

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
