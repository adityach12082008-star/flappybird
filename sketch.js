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
  const spawnData = {
    minGapX: 300,
    maxGapX: 500,
    minH: 150,
    maxH: 650,
    gapV: 175,
    spawnPoint: 500,
  };

  const { minGapX, gapV } = spawnData;

  const tObstacle = o.createObstacle(r.GetScreenWidth(), 0, 40, 300, r.RED);
  const bObstacle = o.createObstacle(
    r.GetScreenWidth(),
    minGapX + gapV,
    40,
    r.GetScreenHeight() - minGapX + gapV,
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
    spawnData,
    gravity,
  };
};

const update = function (w) {
  const { bird, tObstacles, bObstacles, gravity, obsVelocity, spawnData } = w;

  const dt = r.GetFrameTime();
  b.update(bird, gravity, dt);
  o.update(tObstacles, bObstacles, obsVelocity, spawnData, dt);
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
