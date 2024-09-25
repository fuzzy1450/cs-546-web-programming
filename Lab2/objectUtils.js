import * as paramUtils from './paramUtils.js'

export let processObjects = (objArr, func) => {
      paramUtils.assertFuncNumToNum(func, "2nd Argument");
      paramUtils.assertObjArray(objArr, "1st Argument");
      paramUtils.assertLengthMin(objArr, "1st Argument", 1);

      let outputObj = {}

      for (let arrIndex in objArr) {
            let obj = objArr[arrIndex]
            
            for (let key in obj) {
                  paramUtils.assertNum(obj[key])

                  let n = func(obj[key])
                  if(outputObj[key]) {
                        outputObj[key] *= n
                  } else {
                        outputObj[key] = n
                  }
            }
      }

      return outputObj;
};

export let similarKeysValues = (obj1, obj2) => {
      paramUtils.assertObject(obj1, "1st Argument")
      paramUtils.assertObject(obj2, "2nd Argument")

      let outputObj = {}

      for (let key in obj1) {
            let a = obj1[key]
            let b = obj2[key]
            
            if(typeof a == "object" && typeof b == "object") {
                  outputObj[key] = similarKeysValues(a,b)
            } else if (a==b) {
                  outputObj[key] = a;
            }
      }

      return outputObj;
};

export let flipKeysForStringsAndNumbers = (obj) => {
      paramUtils.assertObjectNotEmpty(obj)

      let newObj = {}

      for (let key in obj) {
            let val = obj[key]

            switch (typeof val) {
                  case 'string':
                        paramUtils.assertLengthMin(val.trim(), `(1st Argument)[${key}]`, 1)
                        newObj[val.trim()] = key
                        break;
                  case 'number':
                        newObj[val] = key
                        break;

                  case 'object':
                        if(Array.isArray(val)) { // if its an array, we are de-arraying it and keying the inside to it's index
                             paramUtils.assertLengthMin(val, `(1st Argument)[${key}]`, 1)
                              for(let i in val){
                                    paramUtils.assertEither(val[i], `(1st Argument)[${key}][${i}]`, paramUtils.assertNum, paramUtils.assertStr, "assertNum", "assertStr")
                                    newObj[val[i]] = `${key}_${i}`
                              }
                        } else {
                              newObj[key] = flipKeysForStringsAndNumbers(val)
                        }
                        break;
                  
                  default:
                        throw `Unsupported data type '${typeof val}' at (1st Argument)[${key}]`
            }

      }
      return newObj;
};
