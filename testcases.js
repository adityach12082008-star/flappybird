const isOutOfBounds = function (x, height) {
  if (x < 0 || x + height >= 800) return true;

  return false;
};

const test = function (x, width, expected, message) {
  const actual = isOutOfBounds(x, width);

  const isPassed = actual === expected ? "☑️ PASS" : "❌ FAIL";

  console.log(`${isPassed} - ${message}`);
};

const main = function () {
  testBounds();
};

const testBounds = function () {
  test(100, 50, false, "Object is inside the screen");
  test(300, 100, false, "Object is in the middle of the screen");
  test(0, 30, false, "Object starts at the top boundary");
  test(770, 30, true, "Object reaches the bottom boundary");
  test(-1, 30, true, "Object crosses the top boundary");
  test(771, 30, true, "Object crosses the bottom boundary");
};

main();
