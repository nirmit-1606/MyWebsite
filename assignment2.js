// Assignment 2: Loops
// 1. Write a function called printNumbers that takes two parameters start and end, and prints the numbers from start to end using a for loop. (Note here start and end are numbers which you will be passing as an argument)

function printNumbers(start, end){
    for(; start <= end; start++){
      console.log(start);
    }
  }
  
  // printNumbers(5, 9);
  
  // 2. Write a function called calculateSum that takes a number limit as a parameter and calculates the sum of all numbers from 1 to limit using a while loop. Return the sum.
  
  function calculateSum(limit){
    let sum = 0;
    while (limit >= 1){
      sum += limit;
      limit--;
    }
    return sum;
  }
  
  // console.log(calculateSum(5));
  
  // 3. Write a function called isPrime that takes a number num as a parameter and checks whether it is prime or not. Return true if it is prime, and false otherwise. Use a loop to perform the necessary calculations.
  
  function isPrime(num){
    for(let i = 2; i <= num/2 ; i++){
      if(num % i == 0){
        return false;
      }
    }
    return true;
  }
  
  // console.log(isPrime(19))
  
  // 4. Write a function called generateFibonacci that takes a number length as a parameter and generates the Fibonacci sequence of the given length. Return an array containing the Fibonacci sequence. Use a loop to generate the sequence.
  
  function generateFibonacci(length){
    const sequence = [0, 1];
    for(let i = 2; i < length; i++){
      const next = sequence[i - 2] + sequence[i - 1];
      sequence.push(next);
    }
    return sequence;
  }
  
  // console.log(generateFibonacci(10))