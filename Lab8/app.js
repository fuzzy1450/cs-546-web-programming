//Here is where you'll set up your server as shown in lecture code
import express from "express";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { routeSetter } from "./routes/index.js";

const app = express();

const _dirname = dirname(fileURLToPath(import.meta.url));

const staticDir = express.static(_dirname + "/public");
app.use("/public", staticDir);

const handlebars = exphbs.create({
	defaultLayout: "main",
	layoutsDir: _dirname + "./views/layouts",
	partialsDir: _dirname + "./views/partials",
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());

routeSetter(app);

app.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});
