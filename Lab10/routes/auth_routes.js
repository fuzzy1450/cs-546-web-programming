import express from "express";
const router = express.Router();

import * as helpers from "../helpers.js";
import * as users from "../data/users.js";

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/signupuser')
  .get(async (req, res) => {
    res.render("signupuser", {
      pageTitle: "Sign Up"
    })
  })
  .post(async (req, res) => {
    let fields = ["firstName", "lastName", "userId", "password", "confirmPassword", "favoriteQuote", "backgroundColor", "fontColor", "role"]
    
    let data = req.body
    let clean_data = {}
    let not_found = []
    fields.forEach((field) => {
      try {
        helpers.assertStr(data[field])
        clean_data[field] = data[field].trim() // data cleaning step - trim all strings
      } catch {
        not_found.push(field)
      }
    })
    if(not_found.length){
      res.status(400).render("signupuser", {
        pageTitle: "Sign Up",
        error: `Bad Request - must supply additional fields [${not_found.join(", ")}]`
      })
      return
    }
    try {
      helpers.assertValidName(clean_data.firstName, "First Name")
      helpers.assertValidName(clean_data.lastName, "Last Name")
      helpers.assertValidUserID(clean_data.userId, "User Id")
      helpers.assertValidPassword(clean_data.password, "Password")
      helpers.assertStringsEqual(clean_data.password, clean_data.confirmPassword, "Password", "Confirm Password")
      clean_data.themePreference = {backgroundColor: clean_data.backgroundColor, fontColor: clean_data.fontColor}
      delete(clean_data.backgroundColor)
      delete(clean_data.fontColor)
      delete(clean_data.confirmPassword)
      helpers.assertValidQuote(clean_data.favoriteQuote, "Favorite Quote")
      helpers.assertValidTheme(clean_data.themePreference, "Theme Preferences")
      helpers.assertValidRole(clean_data.role)



    } catch (e){
      res.status(400).render("signupuser", {
        pageTitle: "Sign Up",
        error: `Bad Request - ${e}`
      })
      return
    }
    
    try {
      let db_res = await users.signUpUser(
        clean_data.firstName,
        clean_data.lastName,
        clean_data.userId,
        clean_data.password,
        clean_data.favoriteQuote,
        clean_data.themePreference,
        clean_data.role
      )
      if(db_res.registrationCompleted) {
        res.redirect("/signinuser")
      } else throw "Some kinda error happened!";
    } catch (e){
      console.error(e)
      res.status(500).render("error", {
        pageTitle:"Error 500",
        error: "Internal Server Error. Click here to return..."
      })
    }
  });

router
  .route('/signinuser')
  .get(async (req, res) => {
    res.render("signinuser", {
      pageTitle:"Sign In"
    })
  })
  .post(async (req, res) => {
    let fields = ["userId","password"];
    let data = req.body;
    let not_found = [];
    let clean_data = {};

    fields.forEach((field) => {
      try {
        helpers.assertStr(data[field])
        clean_data[field] = data[field].trim() // data cleaning step - trim all strings
      } catch {
        not_found.push(field)
      }
    })
    if(not_found.length){
      res.status(400).render("signinuser", {
        pageTitle: "Sign Up",
        error: `Bad Request - must supply additional fields [${not_found.join(", ")}]`
      })
      return
    }

    try {
      helpers.assertValidUserID(clean_data.userId, "User ID")
      helpers.assertValidPassword(clean_data.password, "Password")
      let signInAttempt = await users.signInUser(clean_data.userId, clean_data.password)
      
      req.session.user = signInAttempt

      if(signInAttempt.role == "admin") {
        res.redirect("/administrator")
      } else {
        res.redirect("/user")
      }
      
    } catch (e) {
      res.status(400).render("signinuser", {
        pageTitle: "Sign In",
        error: `Bad Request - ${e}`
      })
    }
  });

router.route('/user').get(async (req, res) => {
  let time = new Date()
  res.render("user", {
    pageTitle: req.session.user.userId,
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    role: req.session.user.role,
    favoriteQuote: req.session.user.favoriteQuote,
    currentTime: `${time.getHours()}:${time.getMinutes()}`,
    currentDate: `${time.getMonth()}/${time.getDay()}/${time.getFullYear()}`,
    isAdmin: (req.session.user.role == "admin"),
    themePreference: helpers.generateStyleString(req.session.user.themePreference)
  })
});

router.route('/administrator').get(async (req, res) => {
  let time = new Date()
  res.render("administrator", {
    pageTitle: req.session.user.userId,
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    role: req.session.user.role,
    favoriteQuote: req.session.user.favoriteQuote,
    currentTime: `${time.getHours()}:${time.getMinutes()}`,
    currentDate: `${time.getMonth()}/${time.getDay()}/${time.getFullYear()}`,
    isAdmin: (req.session.user.role == "admin"),
    themePreference: helpers.generateStyleString(req.session.user.themePreference)
  })
});

router.route('/signoutuser').get(async (req, res) => {
  req.session.destroy()
  res.render("signoutuser",{
    pageTitle: "Signed Out",
    status: "Successfully signed out"
  })
});

export {router};
