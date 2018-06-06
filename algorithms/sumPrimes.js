'use strict';

function sumPrimes(num) {
  let sum = 0;
  let isPrime = false;
  let arr = [];

  for (let i = 2; i < num; i++) {
    isPrime = true;
    for (let j = 2; j <= i / 2; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      } else {
        isPrime = true;
      }
    }
    if (isPrime) {
      sum += i;
    }
  }
  return sum;
}

console.log(sumPrimes(10));
