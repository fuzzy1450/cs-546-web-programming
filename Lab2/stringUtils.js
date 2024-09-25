import * as paramUtils from './paramUtils.js'
// ------ helper functions ------
let calcAnagramIdentity = (str) => {
      let d = {}
      for (let i in str) {
            let c = str[i].toLowerCase();
            if(!d[c]) d[c]=0;
            d[c]++;
      }
      return d
}

let anagramEquality = (a1, a2) => {
      let anagramEqualityHelper = (a1, a2) => {
            for(let i in a1) {
                  if(a1[i] != a2[i]) return false;
            }
            return true;
      }

      return anagramEqualityHelper(a1, a2) && anagramEqualityHelper(a2, a1) // its quick and its easy
}

let min = (a, b) => a>b?b:a // ezpz who needs a library?



// -------- stub starts here --------

export let replaceCharsAtIndexes = (str, idxArr) => {
      paramUtils.assertStr(str, "First argument")
      let s = str.trim()
      paramUtils.assertStr(s, "First argument (trimmed)") // ensure that str is not just whitespace
      if (s.length < 3) throw 'First argument must be at least 3 characters long' // a string of length 1 or 2 are not valid for the algo.

      paramUtils.assertValidIndexArray(idxArr, "Second Argument", s.length-2, 1)

      // now that we know we have valid parameters, lets do this thing

      // first, we build a dict of { c : [i, s, [l, r]] } where
            // i = an index from idxArr
            // c = str[i]
            // s = 0 // 1, signifying left or right, depending on where we pulled the last substitution for that character from
            // [l, r] are the characters to the left and right of c
      let replaceDict = {}
      for (let argIndex in idxArr) {
            let i = idxArr[argIndex];
            let c = s[i]
            if(!replaceDict[c]) { // im not sure what to do if the arguments pass multiple indexes that refer to the same character.
                                    // so i'll just default to throwing those out
                  replaceDict[c] = [i, 0, [s[i-1], s[i+1]]]
            }
      }

      let newStr = ""

      // now we replace
      for (let i in s) {
            let c = s[i]
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

export let anagrams = (str, target) => {
      paramUtils.assertStr(str, "1st Argument")
      paramUtils.assertStr(target, "2nd Argument")

      let s = str.trim()
      let t = target.trim()

      paramUtils.assertStr(s, "1st Argument (trimmed)")
      paramUtils.assertStr(t, "2nd Argument (trimmed)")

      let words = s.split(" ")

      let targetID = calcAnagramIdentity(t)
      
      let foundAnagrams = words.filter((word) => anagramEquality(calcAnagramIdentity(word), targetID)) 

      return foundAnagrams;
};

export let charSwap = (str1, str2) => {
      paramUtils.assertStr(str1, "1st Argument")
      paramUtils.assertStr(str2, "2nd Argument")
      let s1 = str1.trim()
      let s2 = str2.trim()
      paramUtils.assertLengthMin(s1, "1st Argument", 2)
      paramUtils.assertLengthMin(s2, "2st Argument", 2)
      

      let n = parseInt(min(s1.length, s2.length)/2)
      let a1 = s1.split('')
      let a2 = s2.split('')

      let l = s2.length;
      for (let i = 0; i < n; i++) {
            // swap some chars
            let x = a1[i];
            a1[i] = a2[(l-n)+i];
            a2[(l-n)+i] = x;
      }

      return `${a1.join('')} ${a2.join('')}`
};
