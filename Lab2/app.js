import {arrayAnalysis, mergeKeyValuePairs, deepArrayEquality} from './arrayUtils.js'
import {replaceCharsAtIndexes, anagrams, charSwap} from './stringUtils.js'

/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/


// arrayAnalysis Tests
try { // pass test
    const anyze1 = arrayAnalysis( [0,0,0,0,0,0,0,0,0,10000] )
    console.log('arrayAnalysis passed test case')
 } catch (e) {
    console.error('arrayAnalysis failed test case - produced unexpected error');
 }
 try { // fail test
    const anyze2 = arrayAnalysis([[]]);
    console.error('arrayAnalysis failed test case - did not error');
 } catch (e) {
    console.log('arrayAnalysis passed test case - successfully produced error');
 }

 // mergeKeyValuePairs Tests
try { // pass test
    const merged1 = mergeKeyValuePairs( [1,2],[3,4],[5,6],[7,8],[3,9],["t",10],['t', 'z'] )
    if (merged1['t'] != '10, z') throw Error();
    console.log('mergeKeyValuePairs passed test case')
 } catch (e) {
    console.error('mergeKeyValuePairs failed test case');
 }
 try { // fail test
    const merged2 = mergeKeyValuePairs( [1,2],[3,7],["t", ["im in an array :)"]], [1,0])
    console.error('mergeKeyValuePairs failed test case - did not error');
 } catch (e) {
    console.log('mergeKeyValuePairs passed test case - successfully produced error');
 }


 // deepArrayEquality Tests
try {
    const dAE1a = [1,2,3,4,5,6,7,{b:3, a:1, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    const dAE1b = [1,2,3,4,5,6,7,{a:1, b:3, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    const dAE1c = [1,2,3,4,5,6,7,{a:1, b:3, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    const dAE1d = [1,2,3,4,5,6,7,{a:1, b:3, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    if(!deepArrayEquality(dAE1a, dAE1b, dAE1c, dAE1d)){
        throw "They ought to be equal"
    }
    console.log("deepArrayEquality passed test case")
    
} catch (e) {
    console.error('deepArrayEquality failed test case')
}

try {
    const dAE2a = [1,2,3,4,5,6,7,{b:1, a:3, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    const dAE2b = [1,2,3,4,5,6,7,{a:1, b:3, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    const dAE2c = [1,2,3,4,5,6,7,{a:1, b:3, "haha":["Im", "throwing", {a:Symbol(3)}, "curveballs"]},8] // this should produce a clean error - symbols are expressly forbidden
    const dAE2d = [1,2,3,4,5,6,7,{a:1, b:3, "haha":["Im", "throwing", {a:3}, "curveballs"]},8]
    deepArrayEquality(dAE2a, dAE2b, dAE2c, dAE2d)
    console.error("deepArrayEquality failed test case - did not error")

} catch (e) {
    console.log('deepArrayEquality passed test case - successfully produced error')
}



try {
   let testStr = replaceCharsAtIndexes(`i really hope i implemented this correctly. 
      the instructions were slightly vague, tbh. 
      Wish i knew what happened if a character is represented at 2 of the passed indexes.
      but w/e :)`, [2,5,9,11,14,17,40,6]);

   let expectedResult = `i realay hope i  moleiented t  s co eectay. 
      toe  nst uct ons weee sl g tay vague, tbo. 
      W s    knew woat  aeoened  f a coa actee  s  eeeesented at 2 of t e oassed  ndexes.
      but w/e :)`

   if (testStr != expectedResult) throw 'They ought to be equal'
   console.log("replaceCharsAtIndexes passed test case")
} catch (e) {
   console.error("replaceCharsAtIndexes failed test case")
}

try {
   replaceCharsAtIndexes(`  this one is going to fail for sure                                but we shall see`, [1, 100, 10]);
   console.error("replaceCharsAtIndexes failed test case - failed to error")
} catch (e) {
   console.log("replaceCharsAtIndexes passed test case - failed successfully")
}

try {
   let arr = anagrams('the tars bubble, a star twinkles, and the tsar enjoys the arts', "rats");
   if(!arr.includes("tars", "star", "tsar", "arts")) throw `Bad response - ${arr}`
   console.log("anargams passed test case")
} catch (e) {
   console.error("anagrams failed test case")
}

try {
   let arr = anagrams('easy error', "        ");
   console.error("anargams failed test case - failed to error")
} catch (e) {
   console.log("anagrams passed test case - successfully produced error")
}


try {
   let cs = charSwap("test string deluxe  ", "super mega ultimate test string triple deluxe esq.")

   if (cs != "eluxe esq.g deluxe   super mega ultimate test string triple dtest strin") throw 'idk what you got but its also probably gibberish'
   console.log("charSwap passed test case")
} catch (e) {
   console.error("charSwap failed test case")
}

try {
   charSwap("Dont listen to that next guy",["Definetly a valid test string. trust me.", "I even have a length of at least 2:", "3!"])

   console.error("charSwap failed test case - did not error")
} catch (e) {
   console.log("charSwap passed test case - failed successfully")
}
