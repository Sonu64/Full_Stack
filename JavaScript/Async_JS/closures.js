// outerFunction() is a closure function
function outerFunction() {
  let outerVariable = 0;
  return function () {
    outerVariable++;
    return outerVariable;
  };
}

/** though returns a function def, but it comes with the closed
    bag of all vars declared in the function inside which it was defined. 
    This function inside of which it was defined is the Closure function. */
const func = outerFunction();
console.log(func()); // 1
console.log(func()); // 2
console.log(func()); // 3
