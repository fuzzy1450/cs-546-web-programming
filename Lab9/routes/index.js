import { router as fibRoutes } from "./fibonacci_prime.js";

export const routeSetter = (app) => {
	app.use("/", fibRoutes);

	app.use("*", (req, res) => {
		res.status(404).send("Route Not Found!");
	});
};
