import * as paramUtils from './paramUtils.js'

// ---------Helper Functions---------
// These are helper functions. They will not be exported, and therefore will assume that parameters are valid.
// There is a correct way to use them. There is no incorrect way to use them. Good Luck

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

let objEquality = (obj1, obj2) => {
  let objEqualityHelper = (obj1, obj2) => { // helper function that does all the work. see below
    let result = true
    for (let i in obj1) {
      let a = obj1[i]
      let b = obj2[i]
      if(!b) result = false;
      if(typeof a != typeof b) result = false;
  
      switch (typeof a){
        case 'string':
          if(a.localeCompare(b) != 0) result = false;
          break;
        
        case 'boolean':
          if(a!=b) result = false;
          break;
  
        case 'number':
          if (a != b) {
            if(!isNaN(a) || !isNaN(b)) result = false
          }
          break;
  
        case 'undefined':
          break; // we already compared types, so we know that if one is undefined, the other must be as well.
  
        case 'object':
          if (a==null && a!=b){ result = false }
          else if (Array.isArray(a)) {
            if(!Array.isArray(b)) result = false;
            if(!deepArrayEquality(a,b)) result = false;
          } else { // if its not an array, and its not null, then it must be an object.
            if(!objEquality(a,b)) result = false;
          }
          break;
    
          default:
            throw 'Unexpected Data type found inside an object.'
      }
    }
  
    // if we got through that gauntlet, then we can confidently return true
    return result;
  }

  // this is not efficent, but it covers cases where obj1 is a subset of obj2. 
  // simpler than building that logic into the algo intelligently.
  return (objEqualityHelper(obj1,obj2) && objEqualityHelper(obj2,obj1))
}


// ------------ Exported FNs ---------------

export let arrayAnalysis = (arr) => {
  // first, make sure the array is all numbers
  paramUtils.assertNumArray(arr, "Arg1")

  arr.sort( (a,b) => a-b );

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


export let mergeKeyValuePairs = (...arrays) => {
  paramUtils.assertPairArray(arrays,"Arguments")


  let KVPairs = {}
  for (let i in arrays) { // create a rough dict of key-value pairs
    let pair = arrays[i]
    let key = pair[0]
    let val = pair[1]

    if(!KVPairs[key]) {
      KVPairs[key] = []
    }

    KVPairs[key].push(pair[1])
  }

  
  for (let i in KVPairs) {  // need to remove duplicate entries. this little guy does that
    KVPairs[i].sort()       // dont stare too long its not good for the brain
    let l = KVPairs[i].length;
    for(let j = 1; j < l; j++){
      if(KVPairs[i][j] == KVPairs[i][j-1]) {
        KVPairs[i].splice(j,1)
        j--;
        l--;
      }
    }
  }

  for (let i in KVPairs) { // lastly, a little join action
    KVPairs[i] = KVPairs[i].join(', ')
  }

  return KVPairs
};

export let deepArrayEquality = (...arrays) => {
  let result = true // we dont want to short circuit the moment we find an inequality, so we have to remember the inequality until the entirety of each array has been checked. 
                    // otherwise, `dAE([0, Symbol("illegal")], [1, Symbol("Illegal")])` will return false, rather than error
  for (let i in arrays) {
    paramUtils.assertArray(arrays[i], `Argument #${i}`)
    if (arrays[i].length == 0) throw `Argument #${i} is empty. All arguments must contain at least one element`
  }

  if (arrays.length <2) {
    throw `Must pass at least two arrays to compare. recieved ${arrays.length}`
  }


  let baseArray = arrays[0];  // each array will be compared to the first. we're going to store that here, for easy reference.
  
  for (let argIndex in arrays) {
    let x = arrays[argIndex];
    if(baseArray.length != x.length) result = false;

    for(let arrayIndex in x){
      let a = x[arrayIndex];
      let b = baseArray[arrayIndex];

      if ((typeof a) != (typeof b)) result = false;

      switch (typeof a){
        case 'string':
          if(a.trim().localeCompare(b.trim()) != 0) result = false;
          break;
        
        case 'boolean':
          if(a!=b) return false;
          break;

        case 'number':
          if (a != b) {
            if(!isNan(a) || !isNaN(b)) result = false
          }
          break;

        case 'undefined':
          break; // we already compared types, so we know that if one is undefined, the other must be as well.

        case 'object':
          if (a==null && a!=b){ result = false }
          else if (Array.isArray(a)) {
            if(!Array.isArray(b)) result = false;
            if(!deepArrayEquality(a,b)) result = false;
          } else { // if its not an array, and its not null, then it must be an object.
            if(!objEquality(a,b)) result = false;
          }
          break;
        
        default:
          throw `Data type not supported. Expected (string||boolean||number||undefined||null||Array||Object), recieved ${typeof a} at Arg #${argIndex}, index [${arrayIndex}]`
          
      }
    }

  }
  return result;
};
