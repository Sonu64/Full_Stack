/**
 * A callback function is a function passed as an argument to another function,
 * which is then executed at a later time. Callbacks are commonly used in asynchronous
 * operations like reading files, making API calls, or handling user interactions.
 */

// Example 1: Synchronous Callback
function greet(name, callback) {
  console.log("Hello, " + name);
  callback(); // Executing the callback function
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye);

// Example 2: Asynchronous Callback (setTimeout)
console.log("Start");

setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// Example 3: Callback in an API Call (Simulated with setTimeout)
function fetchData(callback) {
  console.log("Fetching data...");

  setTimeout(function () {
    callback("Data received");
  }, 3000);
}

fetchData(function (response) {
  console.log(response);
});

// Example 4: Callbacks in Array Methods
// Many JavaScript array methods use callbacks, such as map, forEach, and filter

let numbers = [1, 2, 3, 4, 5];

let doubled = numbers.map(function (num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6, 8, 10]
