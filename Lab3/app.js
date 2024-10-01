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



try{
    const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c");
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorList = await authors.authorsMultipleGenres();
    console.log (authorList);
}catch(e){
    console.log (e);
}


try{
    const bookData = await books.getBookById("4efdb199-5a0f-4410-bded-ce07990c6aa4");
    console.log (bookData);
}catch(e){
    console.log (e);
}
