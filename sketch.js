const r = require("raylib");
const bird = require("./bird.js");
const obstacle = require("./obstacle.js");
const game = require("./game.js");

const running = function () {
  return !r.WindowShouldClose();
};

const setup = function () {
  const screen = {
    WIDTH: 800,
    HEIGHT: 800,
    FPS: 120,
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
  const bgColor = { r: 38, g: 10, bird: 24, a: 255 };
  const birdColor = { r: 246, g: 200, bird: 95, a: 255 };
  const obsColor = { r: 142, g: 35, bird: 72, a: 255 };

  const tObstacle = obstacle.create(r.GetScreenWidth(), 0, 40, 300, obsColor);
  const bObstacle = obstacle.create(
    r.GetScreenWidth(),
    minGapX + gapV,
    40,
    r.GetScreenHeight() - minGapX + gapV,
    obsColor,
  );

  const tObstacles = [tObstacle];
  const bObstacles = [bObstacle];

  const bird = bird.create(40, screen.WIDTH, 30, 30, 500, birdColor);

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
    tObstacles: tObs,
    bObstacles: bObs,
    gravity,
    obsVelocity,
    spawnData,
    obsColor,
  } = w;

  game.state.isOver = game.checkIsOver(bird.rec, [...tObs, ...bObs]);
  if (game.state.isOver) return;

  const dt = r.GetFrameTime();
  bird.update(bird, gravity, dt);
  obstacle.update(tObs, bObs, obsVelocity, spawnData, obsColor, dt);
};

const draw = function (w) {
  const { bird, tObstacles, bObstacles, bgColor } = w;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  r.DrawRectangle(0, 0, r.GetScreenWidth(), r.GetScreenHeight(), bgColor);
  bird.draw(bird);
  obstacle.draw(tObstacles);
  obstacle.draw(bObstacles);

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
