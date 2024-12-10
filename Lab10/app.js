import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { routeSetter } from "./routes/index.js";

import * as mw from "./middleware.js"

const app = express();

const _dirname = dirname(fileURLToPath(import.meta.url));

const staticDir = express.static(_dirname + "/public");
app.use("/public", staticDir);

const handlebars = exphbs.create({
	defaultLayout: "main",
	layoutsDir: _dirname + "/views/layouts",
	partialsDir: _dirname + "/views/partials"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded())

app.use(session({
     name: "AuthenticationState",
     secret: "SECRETKEYDONUTSHARE O <-- thats the donut",
     saveUninitialized: false,
     resave: false
}))

app.use("/", mw.LogMiddleware) // logging mw
app.use("/", mw.redirectRoot) // mw to redirect from ./ based on authentication status
app.use("/signinuser", mw.restrictAuthedUsers) // mw to restrict authorized users from ./signinuser
app.use("/signupuser", mw.restrictAuthedUsers) // mw to restrict authorized users from ./signupuser

app.use("/user", mw.restrictNonUsers) // mw to restrict non-authorized guests from ./user
app.use("/administrator", mw.restrictNonAdmins) // mw to restrict non-admins from ./administrator
app.use("/signoutuser", mw.restrictNonUsers) // mw to restrict non-authorized guests from ./signoutuser


routeSetter(app);

app.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});
