const {teams} = await import("../config/mongoCollections.js");
const {ObjectId} = await import('mongodb');
import * as paramUtils from '../paramUtils.js';
import * as helpers from '../helpers.js';

// TODO: Export and implement the following functions in ES6 format
export const createTeam = async (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  paramUtils.assertStr(name, "1st Argument");
  paramUtils.assertStr(sport, "2nd Argument");
  paramUtils.assertStr(city, "4th Argument");
  paramUtils.assertStr(state, "5th Argument");
  paramUtils.assertStr(stadium, "6th Argument");

  let nameTrim = name.trim()
  let sportTrim = sport.trim();
  let cityTrim = city.trim();
  let stateFmt = paramUtils.validateStateCodeStr(state, "5th Argument")
  let stadiumTrim = stadium.trim();
 

  paramUtils.assertNum(yearFounded, "3rd Argument")
  if (yearFounded<1850 || yearFounded>(new Date()).getFullYear()) throw `3rd Argument must between 1850 and the current year (${new Date().getFullYear()}). got ${yearFounded}`;

  paramUtils.assertWholeNumber(championshipsWon, "7th Argument");
  paramUtils.assertNotNegativeNumber(championshipsWon, "7th Argument");

  paramUtils.assertArray(players, "8th Argument")
  helpers.assertPlayerArray(players, "8th Argument");

  let col = await teams();

  let newTeam = {
    name: nameTrim,
    sport: sportTrim,
    yearFounded: yearFounded,
    city: cityTrim,
    state: stateFmt,
    stadium: stadiumTrim,
    championshipsWon: championshipsWon,
    players: players
  }

  let res = await col.insertOne(newTeam)

  if(res.insertedId) {
    newTeam["_id"] = res.insertedId.toString();
    return newTeam;
  } 
  else { throw `Insertion Failure - Did not get an insertedID. Got ${res}` }

};

export const getAllTeams = async () => {
  let col = await teams();
  let arr = await (col.find()).toArray();


  for (let i in arr) {
    arr[i]["_id"] = arr[i]["_id"].toString();
  }

  return arr;
};

export const getTeamById = async (id) => {
  paramUtils.assertStr(id, "1st Argument");
  let idTrim = id.trim();

  if(!ObjectId.isValid(idTrim)) throw `${id} is not a valid ObjectID`;

  let col = await teams();

  let res = await col.findOne({"_id" : new ObjectId(idTrim)});

  if(!res) throw `Object with id ${idTrim} not found`;

  res["_id"] = res["_id"].toString();

  return res;

};

export const removeTeam = async (id) => {
  paramUtils.assertStr(id, "1st Argument");
  let idTrim = id.trim();

  if(!ObjectId.isValid(idTrim)) throw `${id} is not a valid ObjectID`;

  let team = await getTeamById(id);

  let col = await teams();
  let res = null;
  try {
    res = await col.deleteOne({"_id" : new ObjectId(idTrim)});
  } catch (e) {
    throw `Could not delete team with id ${idTrim}`; 
  }

  return `${team.name} has been successfully deleted!`;

};

export const moveTeam = async (id, newCity, newState, newStadium) => {};
