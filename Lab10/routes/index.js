//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import { router as auth_routes } from "./auth_routes.js";

export const routeSetter = (app) => {
	app.use("/", auth_routes);

	app.use("*", (req, res) => {
		res.status(404).send("Route Not Found!");
	});
};
