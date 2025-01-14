//You will create, configure, and run your server from this file
//Lecture Code Reference -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/app.js

/*
Lab Requirements:
-You must not submit your node_modules folder
-You must remember to save your dependencies to your package.json folder
-You must remember to update your package.json file to set app.js as your starting script!
-You must submit a zip archive or you will lose points, named in the following format: LastName_FirstName_CS546_SECTION.zip  You will lose points for not submitting an archive.
-DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON (OR package-lock.json) FILE.
*/
import express from 'express';
import {routeSetter} from './routes/index.js'
const app = express();


app.use(express.json());

routeSetter(app);

app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
})

// this was the easiest lab so far, only took me an hour and a half
// i just re-read the instructions and saw the line
//      -DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON (OR package-lock.json) FILE.
// i guess ill refactor stuff to meet that requirement

// i did it, it took me 10 minutes
