//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import {router as bookRoutes} from './books.js';
import {router as authorRoutes} from './authors.js';

export const routeSetter = (app) => {
    app.use("/books", bookRoutes);
    app.use("/authors", authorRoutes);

    app.use("*", (req, res)=>{
        res.status(404).send("Route Not Found!");
    })
};

