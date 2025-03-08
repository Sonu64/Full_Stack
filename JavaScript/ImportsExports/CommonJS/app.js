const mathOperations = require("./operations.js");

console.log(
  `2 + 3 = ${mathOperations.add(2, 3)}\n2 - 3 = ${mathOperations.subtract(
    2,
    3
  )}\n2 * 3 = ${mathOperations.multiply(2, 3)}\n2 / 3 = ${mathOperations.divide(
    2,
    3
  )}`
);
