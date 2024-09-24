import * as paramUtils from './paramUtils.js'

export let replaceCharsAtIndexes = (str, idxArr) => {
      paramUtils.assertStr(str, "First argument")
      paramUtils.assertStr(str.trim(), "First argument (trimmed)") // ensure that str is not just whitespace
      if (str.length < 3) throw 'First argument must be at least 3 characters long' // a string of length 1 or 2 are not valid for the algo.

      paramUtils.assertValidIndexArray(idxArr, "Second Argument", str.length-2, 1)

      // now that we know we have valid parameters, lets do this thing

      // first, we build a dict of { c : [i, s, [l, r]] } where
            // i = an index from idxArr
            // c = str[i]
            // s = 0 // 1, signifying left or right, depending on where we pulled the last substitution for that character from
            // [l, r] are the characters to the left and right of c
      let replaceDict = {}
      for (let argIndex in idxArr) {
            let i = idxArr[argIndex];
            let c = str[i]
            if(!replaceDict[c]) { // im not sure what to do if the arguments pass multiple indexes that refer to the same character.
                                    // so i'll just default to throwing those out
                  replaceDict[c] = [i, 0, [str[i-1], str[i+1]]]
            }
      }

      let newStr = ""

      // now we replace
      for (let i in str) {
            let c = str[i]
            let instr = replaceDict[c]
            if(instr && instr[0] < i) {// we only replace instances of c after the index of it's instruction, so we compare that to the current index
                  newStr+=instr[2][instr[1]]
                  instr[1] = (instr[1] ? 0 : 1) // im fairly certain this will modify replaceDict. 
            } else {
                  newStr+=c
            }
      }

      return newStr;
};

export let anagrams = (str, target) => {};

export let charSwap = (str1, str2) => {};
