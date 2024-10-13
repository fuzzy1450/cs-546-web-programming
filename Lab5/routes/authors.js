//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById function and call it in the :/id route.
import * as data from './data/data.js';

const router = express.Router();

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
