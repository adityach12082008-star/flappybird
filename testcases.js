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
  test(2, 30, false, "Object is inside the screen");
  test(100, 50, false, "Object is completely inside the screen");
  test(0, 30, false, "Object is at the left boundary");
  test(770, 30, true, "Object touches the right boundary");
  test(771, 30, true, "Object crosses the right boundary");
  test(801, 30, true, "Object is beyond the right boundary");
  test(-1, 30, true, "Object crosses the left boundary");
  test(-30, 30, true, "Object is completely outside the left boundary");
  test(400, 400, true, "Object reaches the right boundary exactly");
  test(500, 100, false, "Object is within the screen limits");
};

main();
