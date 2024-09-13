import * as lab1 from './lab1.mjs';

console.log(lab1.questionOne([85, 13, 73, 99, 1, 10])); // returns [ 86, 195, false ] 
console.log(lab1.questionOne([1,1,1,1,1,1,2,3,4,5])); // returns [ 10, 10, true ] 
console.log(lab1.questionOne([1938474])); // returns [ 0, 1938474, true ]
console.log(lab1.questionOne([29,310,9321,3])); // returns [ 32, 9631, false ]
console.log(lab1.questionOne([79, 71, 77, 10])); // returns [ 150, 87, false ] 

// make 5 calls to questionTwo passing in different inputs
console.log(lab1.questionTwo(10, 1)); //returns { '55': 55 }
console.log(lab1.questionTwo(0, 11)); //returns { '0': 0 } 
console.log(lab1.questionTwo(4, 19)); //returns { '3': 57 }
console.log(lab1.questionTwo(7, 2)); //returns { '13': 26 }
console.log(lab1.questionTwo(5, 0)); //returns { '5': 0 }

// make 5 calls to questionThree
console.log(lab1.questionThree("The89123are819no812394spaces89124789in7412this8791string")) //returns 1
console.log(lab1.questionThree("")) //returns 0
console.log(lab1.questionThree("  Test            Case  ")) //returns 2. good test case IMO
console.log(lab1.questionThree("1 two 3 four 5 six 7 eight 9 ten")) //returns 5
console.log(lab1.questionThree("our man bashir")) //returns 3

// make 5 calls to questionFour
console.log(lab1.questionFour([1,1,1]));  //returns 1
console.log(lab1.questionFour([3,3,3]));  //returns 27
console.log(lab1.questionFour([0,1,2,3,4,5,6,7,8,9,10]));  //returns 275
console.log(lab1.questionFour([5,5,4,4]));  //returns 95
console.log(lab1.questionFour([8,9,1,1,2]));  //returns 250


