const r = require("raylib");
const b = require("./bird.js");
const o = require("./obstacle.js");
const game = require("./game.js");

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
    minH: 300,
    maxH: 600,
    gapV: 175,
    spawnPoint: 500,
  };

  const { minGapX, gapV } = spawnData;
  const bgColor = { r: 16, g: 11, b: 43, a: 255 };
  const birdColor = { r: 255, g: 53, b: 197, a: 255 };
  const obsColor = { r: 0, g: 229, b: 255, a: 255 };

  const tObstacle = o.createObstacle(r.GetScreenWidth(), 0, 40, 300, obsColor);
  const bObstacle = o.createObstacle(
    r.GetScreenWidth(),
    minGapX + gapV,
    40,
    r.GetScreenHeight() - minGapX + gapV,
    obsColor,
  );

  const tObstacles = [tObstacle];
  const bObstacles = [bObstacle];

  const bird = b.createBird(40, screen.WIDTH, 30, 30, 500, birdColor);

  return {
    bird,
    tObstacles,
    bObstacles,
    obsVelocity,
    spawnData,
    gravity,
    bgColor,
    obsColor,
  };
};

const update = function (w) {
  const {
    bird,
    tObstacles,
    bObstacles,
    gravity,
    obsVelocity,
    spawnData,
    obsColor,
  } = w;

  game.state.isOver = game.checkIsOver(bird.rec, [
    ...tObstacles,
    ...bObstacles,
  ]);
  if (game.state.isOver) return;

  const dt = r.GetFrameTime();
  b.update(bird, gravity, dt);
  o.update(tObstacles, bObstacles, obsVelocity, spawnData, obsColor, dt);
};

const draw = function (w) {
  const { bird, tObstacles, bObstacles, bgColor } = w;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  r.DrawRectangle(0, 0, r.GetScreenWidth(), r.GetScreenHeight(), bgColor);
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
