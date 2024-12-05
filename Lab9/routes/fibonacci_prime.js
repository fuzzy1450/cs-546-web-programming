import express from "express";
import { fileURLToPath } from "url";
import path from "path";


const router = express.Router();
const _dirname = path.dirname(fileURLToPath(import.meta.url));


router.route("/").get(async (req, res) => {
	res.sendFile(path.resolve(_dirname + "/../static/homepage.html"));
});

export { router };
