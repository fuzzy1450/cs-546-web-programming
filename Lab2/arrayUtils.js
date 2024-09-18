/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let assertNum = (v, varName) => {
  if (typeof v !== 'number') throw `${varName || v} must be a number. Recieved type ${typeof v}`;
  if (isNaN(v)) throw `${varName || v} is NaN`;

}

let assertNumArray = (v, varName) => {
  if (!Array.isArray(v)) throw `${varName || v} must be an array.`;
  try{  // i want to shape the error to be more verbose, so im catching this one even though i was told not to
    for (i in v) {assertNum(v[i], `${varName || "Array"}[${i}]`)}
  } catch (e) { 
    throw new Error(`${varName || v} must contain only numbers.`, {cause: e}) // i am propegating the error here.
  }                                                                           // please dont take off points
}

let calculateFrequencies = (arr) => {
  let fqDict = {}
  for (i in arr) {
    if(fqDict[arr[i]]) {
      fqDict[arr[i]]++
    } else {
      fqDict[arr[i]]=1
    }
  }
  return fqDict
}

let calculateAverage = (arr) => {
  let n = arr.length
  let s = 0
  for (i in arr) {
    s+= arr[i]
  }
  return (s/n)
}

let arrayAnalysis = (arr) => {
  // first, make sure the array is all numbers
  assertNumArray(arr, "Arg1")

  arr.sort();
  let avg = calculateAverage(arr)
  let fqDict = calculateFrequencies(arr)
  // TODO: Continue implementing

};

let mergeKeyValuePairs = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
};

let deepArrayEquality = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
};
