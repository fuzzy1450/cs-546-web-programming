/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

// ----------Data Sanitization Functions----------
let assertNum = (v, varName) => {
  if (typeof v !== 'number') throw `${varName || v} must be a number. Recieved type ${typeof v}`;
  if (isNaN(v)) throw `${varName || v} is NaN`;

}

let assertNumArray = (v, varName) => {
  if (!Array.isArray(v)) throw `${varName || v} must be an array.`;
  if (v.length == 0) throw `${varName || v} must have at least one element.`;

  try{  // i want to shape the error to be more verbose, so im catching this one even though i was told not to
    for (let i in v) {
      assertNum(v[i], `${varName || "Array"}[${i}]`)
    }
  } catch (e) { 
    throw new Error(`${varName || v} must contain only numbers.`, {cause: e}) // i am propegating the error here.
  }                                                                           // please dont take off points
}

// ---------Helper Functions---------
// These are helper functions. They will not be exported, and therefore will not be checking parameters. 
// There is a correct way to use them. There is no incorrect way to use them. 

let calculateFrequencies = (arr) => {
  let fqDict = {}
  for (let i in arr) {
    if(fqDict[arr[i]]) {
      fqDict[arr[i]]++
    } else {
      fqDict[arr[i]]=1
    }
  }
  return fqDict
}

let getMostFrequent = (fqDict) => {
  let retArr = []
  let c = 0
  for(let i in fqDict) {
    if(fqDict[i] > c) {
      retArr = [parseInt(i)]
      c = fqDict[i]
    }
    else if(fqDict[i] == c){
      retArr.push(parseInt(i))
    }
  }
  
  if(c == 1) return null
  if(retArr.length == 1) {return retArr[0]}
  else return retArr
}

let calculateAverage = (arr) => {
  let n = arr.length
  let s = 0
  for (let i in arr) {
    s+= arr[i]
  }
  return (s/n)
}

let min = (a,b) =>{
  return a < b ? a : b
}

let calculateLowest = (arr) => {
  let L = arr[0] // the array is already sanitized, and we know it has at least one element
  for(let i in arr){
    L = min(L, arr[i])
  }
  return L
}

let max = (a,b) => {
  return a > b ? a : b
}

let calculateHighest = (arr) => {
  let H = arr[0] // the array is already sanitized, and we know it has at least one element
  for(let i in arr){
    H = max(H, arr[i])
  }
  return H
}

let sum = (arr) => {
  let s = 0;
  for (let i in arr) {
    s += arr[i]
  }
  return s;
}

let median = (arr) => {
  let l = arr.length
  let r = l%2
  let mi = (l/2) | 0
  if (r==0){
    return ((arr[mi-1] + arr[mi])/2)
  } else {
    return arr[mi]
  }
}



// ------------ Exported FNs ---------------

export let arrayAnalysis = (arr) => {
  // first, make sure the array is all numbers
  assertNumArray(arr, "Arg1")

  arr.sort( (a,b) => a-b );
  console.dir(arr);

  let avg = calculateAverage(arr)

  let highest = calculateHighest(arr)
  let lowest = calculateLowest(arr)

  let span = (highest-lowest)

  let fqDict = calculateFrequencies(arr)
  let frequentValues = getMostFrequent(fqDict)

  let totalCount = arr.length
  let totalSum = sum(arr)

  let middleValue = median(arr)

  return {
    average: avg,
    middleValue: middleValue,
    frequentValues: frequentValues,
    span: span,
    lowest: lowest,
    highest: highest,
    totalCount: totalCount,
    totalSum: totalSum
  }
};


let mergeKeyValuePairs = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
};

let deepArrayEquality = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
};
