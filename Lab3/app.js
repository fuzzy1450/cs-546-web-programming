/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

import * as authors from "./authors.js";
import * as books from "./books.js";

let s = 0; // successes
let f = 0; // failures


try{
    const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c");
    if (authorData.first_name != "Derward" || authorData.last_name != "Ticic") throw `Wrong Author found. Expected Derward Ticic, got ${authorData.first_name} ${authorData.last_name}`;
    //console.log (authorData);
    console.log("getAuthorById passed test")
    s++;
}catch(e){
    console.error("getAuthorById failed test")
    console.error (e);
    f++;
}

try{
    const authorList = await authors.authorsMultipleGenres();
    //console.log (authorList);
    if(authorList.length != 392) throw `authorList incorrect. expected 392, got ${authorList.length}. possibly data has been updated.`;
    console.log("authorsMultipleGenres passed test");
    s++;
}catch(e){
    console.error ("authorsMultipleGenres failed test");
    console.error (e);
    f++;
}

try{
    const APC = await authors.averagePageCount("Madelaine", "Armatage"); 
    //console.log (APC);
    if(APC != 405.5) throw `APC Value incorrect. expected 405.5, got ${APC}. possibly data has been updated.`;
    console.log("averagePageCount passed test")
    s++;

}catch(e){
    console.error("averagePageCount failed test")
    console.error (e);
    f++;
}

try{
    let min = 25;
    let max = 55;
    const AgeRange = await authors.getAuthorsByAgeRange(min, max); 
    

    for (let i in AgeRange) {
        let age = authors.utils.authorToAge(AgeRange[i]);

        if (age < min || age > max) throw `Age out of range at index ${i}`
    }
    //console.log (AgeRange);
    console.log("getAuthorsByAgeRange passed test")
    s++;

}catch(e){
    console.error("getAuthorsByAgeRange failed test")
    console.error (e);
    f++;
}


try{
    const authorData = await authors.authorsByGenre("Art");
    if(authorData.length != 94) throw `Incorrect return length. expected 94, got ${authorData.length}. possibly data has been updated.`
    //console.log(authorData)
    console.log("authorsByGenre passed test")
    s++;
}catch(e){
    console.error("authorsByGenre failed test")
    console.error (e);
    f++;
}



try{
    const bookData = await books.getBookById("4efdb199-5a0f-4410-bded-ce07990c6aa4");
    if(bookData.title != "Glorious Technicolor") throw `Wrong book returned. Expected "Glorious Technicolor", got "${bookData.title}"`;
    //console.log (bookData);
    console.log("getBookById passed test")
    s++;
}catch(e){
    console.error("getBookById failed test")
    console.error (e);
    f++;
}


try{
    const formatData = await books.booksByFormat();
    //console.dir(formatData);
    if(formatData.Hardcover != 646) throw `Inaccurate format statistics. Expected 646, got ${formatData.Hardcover}. possibly data has been updated.`;
    console.log("booksByFormat passed test")
    s++;
}catch(e){
    console.error("booksByFormat failed test")
    console.error (e);
    f++;
}

try{
    const popularGenre = await books.mostPopularGenre();
    //console.dir(popularGenre);
    if(popularGenre != 'Fiction') throw `Inaccurate popular genre. Expected fiction, got ${popularGenre}. possibly data has been updated.`;

    console.log("mostPopularGenre passed test")
    s++;
}catch(e){
    console.error("mostPopularGenre failed test")
    console.error (e);
    f++;
}

try{
    const bookList = await books.booksByPublisher("Skilith");
    //console.dir(bookList);
    if(bookList.length != 2) throw `Inaccurate bookList length. Expected 2, got ${bookList.length}. possibly data has been updated.`;
    console.log("booksByPublisher passed test");
    s++;
}catch(e){
    console.error("booksByPublisher failed test")
    console.error (e);
    f++;
}

try{
    const avgPrice = await books.averagePriceByGenre("Horror");
    console.log(avgPrice);
    if(avgPrice != 54.51) throw `Inaccurate average price. Expected 54.51, got ${avgPrice}. possibly data has been updated.`;
    console.log("booksByPublisher passed test")
    s++
}catch(e){
    console.error("booksByPublisher failed test")
    console.error (e);
    f++;
}


if (!f) {console.log(`All Positive Tests Passed (${s})`)}
else {console.log(`Passed ${s}/${s+f}`)}
let f_c = f; // remember what f is, so we know later if further tests failed

// ------------------- These tests should fail! --------------------



try{
    const authorData = await authors.getAuthorById(" 1871e6d7-551f-41cb-9a07-08 240b86c95c              ");
    console.error("getAuthorById failed to error");
    console.error(authorData);
    f++;
}catch(e){
    console.log("getAuthorById passed test");
    s++;
}

try{
    const APC = await authors.averagePageCount("Madelaine", 5); 

    console.error("averagePageCount failed to error");
    console.error(APC);
    f++;

}catch(e){
    console.log("averagePageCount passed test");
    s++;
}

try{
    let min = 100;
    let max = -5;
    const AgeRange = await authors.getAuthorsByAgeRange(min, max); 
    
    console.error("getAuthorsByAgeRange failed to error")
    console.error(AgeRange);
    f++;

}catch(e){
    console.log("getAuthorsByAgeRange passed test");
    s++;
}


try{
    const authorData = await authors.authorsByGenre("           ");
    console.error("authorsByGenre failed to error");
    console.error(authorData);
    f++;
}catch(e){
    console.log("authorsByGenre passed test");
    s++;
}



try{
    const bookData = await books.getBookById();
    console.error("getBookById failed to error")
    console.error(bookData);
    f++;
}catch(e){
    console.log("getBookById passed test");
    s++;
}

try{
    const bookList = await books.booksByPublisher({});
    console.error("booksByPublisher failed to error");
    console.error(bookList);
    f++;
}catch(e){
    console.log("booksByPublisher passed test");
    s++;
}

try{
    const avgPrice = await books.averagePriceByGenre(111111111);
    console.error("booksByPublisher failed to error")
    console.error(avgPrice)
    f++
}catch(e){
    console.log("booksByPublisher passed test")
    s++;
}


if (!(f-f_c)) {console.log(`All Negative Tests Passed (${s})`)}
else {console.log(`Passed ${s}/${s+f}`)}
