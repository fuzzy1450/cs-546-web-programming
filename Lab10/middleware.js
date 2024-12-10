/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

export const LogMiddleware = async (req, res, next) => {
    let ts = new Date().toUTCString()
    let method = req.method
    let route = req.originalUrl
    let authed = Boolean(req.session.user);
    let role = authed ? req.session.user.role : "guest"

    console.log(`[${ts}] ${method} ${route} ${role}`);
    next();
}

export const redirectRoot = async (req, res, next) => {

    let route = req.originalUrl
    if (route != "/") return next();

    let authed = Boolean(req.session.user);
    let role = (authed  ? req.session.user.role : "none")

    switch (role){
        case "admin":
            res.redirect("/administrator")
            break;
        case "user":
            res.redirect("/user")
            break;
        case "none":
            res.redirect("/signinuser")
            break;
    }
}

export const restrictAuthedUsers = async (req, res, next) => {
    // middleware function that redirects authenticated users to their respective homepage
    let route = req.originalUrl

    let authed = Boolean(req.session.user);
    let role = (authed  ? req.session.user.role : "none")
    switch (role){
        case "admin":
            res.redirect("/administrator")
            break;
        case "user":
            res.redirect("/user")
            break;
        case "none":
            next()
            break;
    }

}

export const restrictNonUsers = async (req, res, next) => {
    let authed = Boolean(req.session.user);
    if(authed) {
        next()
    } else {
        res.redirect("/signinuser")
    }
}

export const restrictNonAdmins = async (req, res, next) => {
    let authed = Boolean(req.session.user);
    let role = (authed ? req.session.user.role : "none")
    switch (role){
        case "admin":
            next()
            break;
        case "user":
            res.status(403).render("error",{
                PageTitle: "Forbidden",
                error: "You are not allowed to visit this page. Click here to navigate away...",
                acknowledge_url:"/user",
                themePreference: helpers.generateStyleString(req.session.user.themePreference)
            })
            break;
        case "none":
            res.redirect("/signinuser")
            break;
    }
}

