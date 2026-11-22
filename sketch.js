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
  const obsVelocity = { horizontal: 240, vertical: 0 };
  const obsGap = { minGapX: 300, maxGapX: 500, gapV: 175 };
  const { minGapX, gapV } = obsGap;

  const tObstacle = o.createObstacle(800, 0, 40, 300, r.RED);
  const bObstacle = o.createObstacle(
    800,
    minGapX + gapV,
    40,
    800 - minGapX + gapV,
    r.RED,
  );

  const tObstacles = [tObstacle];
  const bObstacles = [bObstacle];

  const bird = b.createBird(40, screen.WIDTH, 32, 48, 500, r.BLUE);

  return {
    bird,
    tObstacles,
    bObstacles,
    obsVelocity,
    obsGap,
    gravity,
  };
};

const update = function (w) {
  const { bird, tObstacles, bObstacles, gravity, obsVelocity, obsGap } = w;

  const dt = r.GetFrameTime();
  b.update(bird, gravity, dt);
  o.update(tObstacles, bObstacles, obsVelocity, obsGap, dt);
};

const draw = function (w) {
  const { bird, tObstacles, bObstacles } = w;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  b.drawBird(bird);
  o.drawObstacles(tObstacles);
  o.drawObstacles(bObstacles);

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
