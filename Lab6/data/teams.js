// This data file should export all functions using the ES6 standard as shown in the lecture code
const {teams} = await import("../config/mongoCollections.js");
const {ObjectId} = await import('mongodb');
import * as helpers from '../helpers.js';

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

  let newTeam = helpers.createValidTeam(name, sport, yearFounded, city, state, stadium, championshipsWon, players)
  let col = await teams();

  let res = await col.insertOne(newTeam)

  if(res.insertedId) {
    newTeam["_id"] = res.insertedId.toString();
    return newTeam;
  } 
  else { throw `Insertion Failure - Did not get an insertedID. Got ${res}` }

};

export const getAllTeams = async () => {
    let col = await teams();
    let arr = await (col.find()).toArray().map( (team) => ({_id: team["_id"].toString(), name: team.name}) );
  
    return arr;
};

export const getTeamById = async (id) => {
  helpers.assertStr(id, "1st Argument");
  let idTrim = id.trim();

  if(!ObjectId.isValid(idTrim)) throw `${id} is not a valid ObjectID`;

  let col = await teams();

  let res = await col.findOne({"_id" : new ObjectId(idTrim)});

  if(!res) throw `Object with id ${idTrim} not found`;

  res["_id"] = res["_id"].toString();

  return res;
};

export const removeTeam = async (id) => {
  team = await getTeamById(id); // this will also do validation for us

  let idTrim = id.trim();
  let col = await teams();
  let res = await col.deleteOne({"_id" : new ObjectId(idTrim)});
  
  if(res.deletedCount!=1) throw `Team with id ${idTrim} not found`;

  return team;
};

export const updateTeam = async (
  id,
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  let newTeam = helpers.createValidTeam(name, sport, yearFounded, city, state, stadium, championshipsWon, players)
  let oldTeam = await getTeamById(id); // this will also do validation for us

  let idTrim = id.trim();
  let col = await teams();

  let res = await col.updateOne({"_id" : new ObjectId(idTrim)}, newTeam);

  if(res.matchedCount == 0) throw `Team with id ${idTrim} not found`;
  if(res.modifiedCount == 0) throw `Team with id ${idTrim} was found, but not updated`;

  newTeam["_id"] = idTrim;

  return newTeam;
};
