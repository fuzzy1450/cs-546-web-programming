import {arrayAnalysis, mergeKeyValuePairs, deepArrayEquality} from './arrayUtils.js'
import {replaceCharsAtIndexes, anagrams, charSwap} from './stringUtils.js'
import {processObjects, similarKeysValues, flipKeysForStringsAndNumbers} from './objectUtils.js'

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
   console.log("replaceCharsAtIndexes passed test case - successfully produced error")
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
   if (cs != "luxe esq.ng deluxe super mega ultimate test string triple detest stri") throw 'idk what you got but its also probably gibberish'
   console.log("charSwap passed test case")
} catch (e) {
   console.error("charSwap failed test case")
}

try {
   charSwap("Dont listen to that next guy",["Definetly a valid test string. trust me.", "I even have a length of at least 2:", "3!"])

   console.error("charSwap failed test case - did not error")
} catch (e) {
   console.log("charSwap passed test case - successfully produced error")
}


try {
   const one = {a: 2, b:8, x:5, y:2, z:11};
   const two = {f: 2, g:51, i:8, j:3, k:3};
   const three = {a:100, j: 100};
   const four = {i:6,j:4,k:3, y:0};

   const func = (x) => 1/x

   let ret = processObjects([one,two,three,four],func)

   if (ret.x != 0.2) throw 'fail!'
   if (ret.y != Infinity) throw 'fail!'

   if (ret.f != 0.5) throw 'fail!'

   console.log("processObject passed test case")
} catch (e) {
   console.error("processObject failed test case")
}


try {
   const one   = {1:1}
   const two   = {1:2, 2:2}
   const three = {1:3, 2:3, 3:3}
   const four  = {1:4, 2:4, 3:4, 4:4}
   const five  = {1:5, 2:5, 3:5, 4:5, 5:5}

   const func = (x) => `${x}`

   processObjects([one,two,three,four,five], func) 
   // the only error here is that func does not return a number
   // the spec says that we can assume the inputs for func are correct because we check them
   // but it says nothing about the output. According to the question, the output of the func must be a number.


   console.error("processObject failed test case - did not error")
} catch (e) {
   console.log("processObject passed test case - successfully produced error")
}


try {
   const obj1 = { a: {b: {c: {d:{e:{f:{g:"100"}}}}}} };
   const obj2 = { a: {b: {c: {d:{e:{f:{g:100}, h:0}, i:0}, j:0}, l:0}, m:0}, p:0 };
   let skv = similarKeysValues(obj1, obj2)

   if (skv.a.b.c.d.e.f.g !== "100") throw "Fail!";
   
   console.log("similarKeysValues passed test case")
} catch (e) {
   console.error("similarKeysValues failed test case")
}


try {
   similarKeysValues({0:0,1:1,2:2,3:3,4:4},[0,1,2,3,4])
   console.error("similarKeysValues failed test case - did not error")
} catch (e) {
   console.log("similarKeysValues passed test case - successfully produced error")
}


try {
   const o1 = {1:'a', 'b':{ba:[1,2,3,4,5]}, c:[1,2,3,4,5]}


   const r1 = flipKeysForStringsAndNumbers(o1)

   if (r1.b[4] != "ba_3") throw 'Fail!';

   console.log("flipKeysForStringsAndNumbers passed test case")
} catch (e) {
   console.error("flipKeysForStringsAndNumbers failed test case")

}


try {

   const o2 = {1:'a', 'b':{ba:[1,2,3,4,5]}, c:[1,2,3,4,5], d:{e:{f:{g:[{}]}}}}

   const r2 = flipKeysForStringsAndNumbers(o2)

   console.error("flipKeysForStringsAndNumbers failed test case - did not error")
} catch (e) {
   console.log("flipKeysForStringsAndNumbers passed test case - successfully produced error")
   
}

