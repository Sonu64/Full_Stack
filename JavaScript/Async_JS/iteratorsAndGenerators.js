// Generator functions remembers who calls me how many times and what to return each time.
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

let gen1 = numberGenerator();
let gen2 = numberGenerator();

console.log(gen1, gen2);

// .next() is Iterator function
console.log(gen1.next().value); //1
console.log(gen2.next().value); //1
console.log(gen1.next()); // { value: 2, done: false }
console.log(gen1.next()); // { value: 2, done: false }
console.log(gen1.next()); //{ value: 2, done: false }
