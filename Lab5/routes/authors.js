//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

import * as data from '../data/data.js';
import express from 'express';

export const router = express.Router();

router.route('/')
    .get( async (req, res) => {
        res.json(await data.getAuthors());
    });


router.route('/:id')
    .get(async (req, res)=>{
        try {
            let author = await data.getAuthorById(req.params.id);
            res.json(author);

        } catch (e) {
            res.status(404).send("Author Not Found!");
        }
    });
    
export default router;
