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
  test(0, 0, false, "Object has zero height at the top boundary");
  test(799, 1, true, "Object reaches the maximum height exactly");
  test(800, 0, true, "Object starts at the maximum height");
  test(-10, 0, true, "Object is above the top boundary");
};

main();
