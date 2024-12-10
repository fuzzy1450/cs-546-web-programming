const {users} = await import("../config/mongoCollections.js");
const {ObjectId} = await import('mongodb');

import * as helpers from "../helpers.js";
import bcrypt from "bcrypt";
const salt = 16


//import mongo collections, bcrypt and implement the following data functions
export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  helpers.assertStr(firstName)
  helpers.assertStr(lastName)
  helpers.assertStr(userId)
  helpers.assertStr(password)
  helpers.assertStr(favoriteQuote)
  helpers.assertStr(role)


  let firstTrim = firstName.trim()
  let lastTrim = lastName.trim()

  helpers.assertValidName(firstTrim, "First Name")
  helpers.assertValidName(lastTrim, "Last Name")

  let userTrim = userId.trim()
  helpers.assertValidUserID(userTrim, "userID")

  if(await getUserByUserID(userTrim)) throw "User already exists"


  let passTrim = password.trim()
  helpers.assertValidPassword(passTrim, "Password")
  let hashPass = await bcrypt.hash(passTrim, salt)

  let quoteTrim = favoriteQuote.trim()
  helpers.assertValidQuote(quoteTrim, "Favorite Quote")

  
  helpers.assertValidTheme(themePreference, "Theme Preference")

  let roleTrim = role.trim()
  helpers.assertValidRole(roleTrim, "Account Role")


  let newUser = {
    firstName: firstTrim,
    lastName: lastTrim,
    userId: userTrim,
    password: hashPass,
    favoriteQuote: quoteTrim,
    themePreference: themePreference,
    role: roleTrim
  }

  let col = await users()
  let res = await col.insertOne(newUser)

  if(res.insertedId) {
    return {registrationCompleted: true}
  } 
  else { throw `Account Creation Failure - Did not get an insertedID. Got ${res}` }
};

export const getUserByUserID = async (userId) => {
  let userTrim = userId.trim()
  
  helpers.assertValidUserID(userTrim, "userID");

  let col = await users();

  let res = await col.findOne({"userId" : userTrim,}, {collation: {locale: 'en', strength: 2}});

  if(!res) return false;

  res["_id"] = res["_id"].toString();

  return res;
};



export const signInUser = async (userId, password) => {
  helpers.assertStr(userId, "User ID");
  helpers.assertStr(password, "Password");

  let userTrim = userId.trim()

  let passTrim = password.trim()

  helpers.assertValidUserID(userTrim, "User Id")

  helpers.assertValidPassword(passTrim, "Password")

  let foundUsr = await getUserByUserID(userTrim)
  

  if(foundUsr){
    let pass_check = await bcrypt.compare(passTrim,foundUsr.password)

    if(pass_check){
      delete(foundUsr._id)
      delete(foundUsr.password)
      return foundUsr
    } else throw "Either the userId or password is invalid"

  } else {
    throw "Either the userId or password is invalid"
  }
};
