const r = require("raylib");
const b = require("./bird.js");

function running() {
  return !r.WindowShouldClose();
}

function setup() {
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

  const bird = b.createBird(100, screen.WIDTH, 32, 48, 500, r.BLUE);

  return { bird, gravity };
}

function update(w) {
  const { bird, gravity } = w;

  const dt = r.GetFrameTime();
  b.jump(bird, gravity, dt);
}

function draw(w) {
  const { bird } = w;
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  b.drawBird(bird);

  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
