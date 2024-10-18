//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes
import * as data from '../data/data.js';
import express from 'express';

//You can import your getBooks() function in the /data/data.js file to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
export const router = express.Router();

router.route('/')
    .get(async(req, res)=>{
        res.json(await data.getBooks());
    });

router.route('/:id')
.get(async (req, res)=>{
    try {
        let book = await data.getBookById(req.params.id);
        res.json(book);

    } catch (e) {
        res.status(404).send("Book Not Found!");
    }
});

export default router;
