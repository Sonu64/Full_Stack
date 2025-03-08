function doSomething() {
  console.log("Doing Something at the beginning, still coming last !");
}

// 1st one to go to Call Stack and gets called
console.log("I am 1st");

// gone to Web APIs from Call Stack after control reaches here
setTimeout(() => {
  doSomething();
}, 5000);

// 2nd one to go to Call Stack and gets called
for (let index = 0; index < 10; index++) {
  console.log(index);
}

// After 5 seconds doSomething() gets called as setTimeOut() is an Async function.
