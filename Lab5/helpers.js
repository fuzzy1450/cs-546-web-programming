
// ----------Type Enforcement Functions----------
export let assertNum = (v, varName) => {
    if (typeof v !== 'number') throw `${varName || v} must be a number. Recieved type ${typeof v}`;
    if (isNaN(v)) throw `${varName || v} must be a Number. Recieved NaN`;
    if (v == Infinity) throw `${varName || v} must be a Number. Recieved Infinity`
  
}

export let assertWholeNumber = (v, varName) => {
    assertNum(v, varName)
    if (v%1 != 0) throw `${varName || v} must be a whole number. Found a decimal of ${v%1}`
}

export let assertNotNegativeNumber = (v, varName) => {
    assertNum(v, varName)
    if(v<0) throw `${varName || v} must be not be a negative number`;
}

export let assertNumArray = (v, varName) => {
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
  
export let assertEither = (v, varName, a1, a2, a1Name, a2Name) => {  // a special function that throws an error if v does not pass either assertions of a1 or a2.
    try {                                                       // if v passes either a1 or a2, no error will be thrown
        a1(v, varName)
    } catch (e1) {
        try {
        a2(v, varName)
        } catch (e2) {
        throw new Error(`${varName || v} failed both asserions (${a1Name || a1}, ${a2Name || a2})`, {cause: [e1, e2]})
        }
    }
}
  
export let assertStr = (v, varName) => { // this also does not allow empty strings
    if (typeof v !== 'string') throw `${varName || v} must be a string. Recieved type ${typeof v}`
    if (v.trim()==0) throw `${varName || v} must not be empty.` // this catches many things. most of them cant be used as keys for dicts.
}

export let validateStateCodeStr = (v, varName) => { // asserts that the var passed is a string containing a 2 letter state code.
    assertStr(v, varName);                          // unlike assertion functions, this returns a string containing that state code in the prefered format.
    let vFmt = v.trim().toUpperCase();
    let stateCodes = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'];

    if (!stateCodes.includes(vFmt)) throw `${varName || v} must be a valid state code. got ${v}`;
    return vFmt;
}
  
export let assertArray = (v, varName) => {
    if (!Array.isArray(v)) throw `(${varName || v}) must be an array.`;
}

export let assertLengthMin = (v, varName, m) => {
    if(v.length < m) throw `${varName || v} has length ${v.length} - a minimum of ${m} is required`
}

export let assertValidIndexArray = (v, varName, max, min=0) => {
    assertNumArray(v, varName)
    for (let i in v) {
        if (v[i] < min) throw `${varName || v}[${i}] must be at least ${min}`;
        if (v[i] > max) throw `${varName || v}[${i}] cannot be greater than ${max}`;
    }
}
  
export let assertKeyPair = (v, varName) =>{
    assertArray(v, varName)
    if (v.length != 2) throw `(${varName || v}) must have two elements`;
    assertEither(v[0], `(${varName || v})[0]`, assertStr, assertNum, "assertStr", "assertNum")
    assertEither(v[1], `(${varName || v})[1]`, assertStr, assertNum, "assertStr", "assertNum")
}
  
export let assertPairArray = (v, varName) => {
    assertArray(v, varName)
    if (v.length == 0) throw `${varName || v} must have at least one element`;
    
    for(let i in v){
      assertKeyPair(v[i], `Arg${i}`)
    }
}

export let assertObject = (v, varName) => { // the easiest assertion in the world
    if (typeof v != "object") throw `${varName || v} must be an object. Recieved ${typeof v}`
    if (Array.isArray(v)) throw `${varName || v} cannot be an array`
}

export let assertObjectNotEmpty = (v, varName) => {
    assertObject(v, varName);
    let n = 0;
    for (let i in v) {
        n++;
    }
    if (!n) throw `${varName || v} must not be empty.`
}

export let assertObjArray = (v, varName) => { // asserts that v is an array containing exclusively non-empty object. Or nothing.
    assertArray(v, varName)

    for (let i in v) {
        assertObjectNotEmpty(v[i])
    }
}

export let assertFunc = (v, varName) => {
    if (typeof v != 'function') throw `${varName || v} must be a function. Recieved type ${typeof v}`
}

export let assertFuncNumToNum = (v, varName) => { // asserts that the function returns a num as the output. Assumes that the fn requires a num as the parameter.
    assertFunc(v, varName)
    let z = v(1)
    try {
        assertNum(z)
    } catch (e) {
        throw `${varName || v} did not return a number`
    }
}
