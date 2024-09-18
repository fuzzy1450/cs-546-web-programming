import {addTwoNumbers, 
        subtractTwoNumbers, 
        multiplyTwoNumbers, 
        divideTwoNumbers} 
from "./calculator.js";

import {getData} from './axiostest.js'

console.log(addTwoNumbers(1,1))
console.log (subtractTwoNumbers(5,10))
console.log (multiplyTwoNumbers(11,11))
console.log (divideTwoNumbers(10,5))


try {
    console.log (divideTwoNumbers(10,0))
} catch (e) {
    console.log(e);
}

try {
    console.log (multiplyTwoNumbers("test","fail"))
} catch (e) {
    console.log(e)
}


console.log(await getData("http://google.com"))

try {
    console.log(await getData("notgoogleNotEvenFakeGoogleJustNotReal.fiction"))
} catch (e) {
    console.log('axios error')
}




