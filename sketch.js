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
  const obstaclesVelocity = { horizontal: 240, vertical: 0 };

  const obstacle1 = o.createObstacle(400, 0, 40, 300, r.RED);
  const obstacle2 = o.createObstacle(700, 0, 40, 600, r.RED);

  const obstacles = [obstacle1, obstacle2];

  const bird = b.createBird(40, screen.WIDTH, 32, 48, 500, r.BLUE);

  return { bird, obstacles, obstaclesVelocity, gravity };
};

const update = function (w) {
  const { bird, obstacles, gravity, obstaclesVelocity } = w;

  const dt = r.GetFrameTime();
  b.jump(bird, gravity, dt);
  o.update(obstacles, obstaclesVelocity, dt);
};

const draw = function (w) {
  const { bird, obstacles } = w;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  b.drawBird(bird);
  o.drawObstacles(obstacles);

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
