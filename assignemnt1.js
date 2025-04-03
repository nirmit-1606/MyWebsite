// Assignment 1: (Conditional and logical operators)
// 1. Write a JavaScript program to find the largest of three given integers.

console.log("part 1:");

function FindLargest(a, b, c) {
  if (a > b) {
    if (a > c) {
      return a;
    } else {
      return c;
    }
  } else {
    if (b > c) {
      return b;
    } else {
      return c;
    }
  }
}

console.log("FindLargest(15,8,5): " + FindLargest(15, 8, 5));
console.log("FindLargest(32, 50, 28): " + FindLargest(32, 50, 28));
console.log("FindLargest(87, 93, 208): " + FindLargest(87, 93, 208));

// 2. Write a JavaScript program to compute the sum of the two given integers.
//    If the sum is in the range 50..80 return 65 otherwise return 80

console.log("part 2:");

function ComputeSum(a, b) {
  const sum = a + b;
  if (sum > 50 && sum < 80) {
    return 65;
  } else {
    return 80;
  }
}

console.log("ComputeSum(45, 25): " + ComputeSum(45, 25));
console.log("ComputeSum(10, 5): " + ComputeSum(10, 5));

// 3. Write a JavaScript program to check if the given number is ODD or EVEN.
//    If the number is odd the output should be ‘the given number is Odd’ and vice versa.

console.log("part 3:");

function OddEven(num) {
  if (num % 2 == 0) {
    console.log("OddEven(" + num + "): The given number is Even");
  } else {
    console.log("OddEven(" + num + "): The given number is Odd");
  }
}

OddEven(20);
OddEven(25);

// 4. Write a JavaScript program to find if the given year is a leap year or not
//    by using %, !=, && and || operators.

console.log("part 4:");

function isLeapYear(year) {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return true;
  } else {
    return false;
  }
}

let year = 2000;

if (isLeapYear(year)) {
  console.log(year + " is a leap year.");
} else {
  console.log(year + " is not a leap year.");
}

// 5. Create a function called gradeStudent that accepts a numerical grade as input
//    and returns a string message based on the grade. For example, if the grade is 90 or above,
//    return "A." If it's between 80 and 89, return "B." If it's between 70 and 79, return "C."
//    If it's between 60 and 69, return "D." Otherwise, return "F."

console.log("part 5:");

function gradeStudent(grade) {
  if (grade >= 90) {
    return "A.";
  } else if (grade >= 80 && grade < 90) {
    return "B.";
  } else if (grade >= 70 && grade < 80) {
    return "C.";
  } else if (grade >= 60 && grade < 70) {
    return "D.";
  } else {
    return "F.";
  }
}

console.log("gradeStudent(95): " + gradeStudent(95));
console.log("gradeStudent(87): " + gradeStudent(87));
console.log("gradeStudent(74): " + gradeStudent(74));
console.log("gradeStudent(68): " + gradeStudent(68));
console.log("gradeStudent(55): " + gradeStudent(55));

// 6. Create a function called calculateBMI that takes a person's weight (in kilograms)
//    and height (in meters) as parameters and returns their BMI (Body Mass Index) category.
//    Use BMI ranges to categorize as "Underweight," "Normal Weight," "Overweight," or "Obese."

console.log("part 6:");

function calculateBMI(weight, height) {
  let BMI = weight / height ** 2;

  if (BMI < 18.5) {
    return "Underweight";
  } else if (BMI >= 18.5 && BMI < 25) {
    return "Normal Weight";
  } else if (BMI >= 25 && BMI < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

console.log("calculateBMI(50, 1.7): " + calculateBMI(50, 1.7));
console.log("calculateBMI(70, 1.7): " + calculateBMI(70, 1.7));
console.log("calculateBMI(80, 1.7): " + calculateBMI(80, 1.7));
console.log("calculateBMI(90, 1.7): " + calculateBMI(90, 1.7));
