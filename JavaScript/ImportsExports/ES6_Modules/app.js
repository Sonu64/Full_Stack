// Named Import
import { add, subtract, multiply } from "./operations.js";

// Default import
import divide from "./operations.js";

console.log(
  `2 + 3 = ${add(2, 3)}\n2 - 3 = ${subtract(2, 3)}\n2 * 3 = ${multiply(
    2,
    3
  )}\n2 / 3 = ${divide(2, 3)}`
);
