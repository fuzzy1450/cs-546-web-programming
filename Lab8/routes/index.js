//Here you will import route files and export them as used in previous labs
import {router as movieRoutes} from './movies.js';

export const routeSetter = (app) => {
    app.use("/", movieRoutes);

    app.use("*", (req, res)=>{
        res.status(404).send("Route Not Found!");
    })
};
