import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { routeSetter } from "./routes/index.js";

const app = express();

const _dirname = dirname(fileURLToPath(import.meta.url));

const staticDir = express.static(_dirname + "/public");
app.use("/public", staticDir);



routeSetter(app);

app.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});
