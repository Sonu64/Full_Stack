function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1 complete");
      resolve(1);
    }, 1000);
  });
}

function step2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 2 complete");
      resolve(2);
    }, 1000);
  });
}

function step3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3 complete");
      resolve(3);
    }, 1000);
  });
}

// Promise Chaining with all .then()s returning PROMISES
step1()
  .then(step2)
  .then(step3)
  .then((step3ResolveData) => {
    console.log(
      `\nFinal Step 3 Resolve Data: ${step3ResolveData}. We don't have access to step 1 and 2 data 
here because of scope. We have to define functions right here instead of seperate definitions
if we wanna access step 1 and step 2 datas in the callbacks (step1 and step2 named functions)\n`
    );
  });

// Promise Chaining with some .then()s returning PROMISES and some NORMAL Values.
// JS automatically wraps normal values as resolved promises
step1()
  .then(step2)
  .then((step2ResolveData) => {
    return step2ResolveData * 2;
  })
  .then((doubledStep2ResolveData) => {
    console.log(
      doubledStep2ResolveData +
        ": .then() has access to its callers RESOLVE DATA or RETURN DATA via the parameter.\n"
    );
  });
