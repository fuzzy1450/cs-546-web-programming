const {teams} = await import("./mongoCollections.js");
const {ObjectID} = await import('mongodb');
import * as paramUtils from './paramUtils.js';

// TODO: Export and implement the following functions in ES6 format
const createTeam = async (
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


};

const getAllTeams = async () => {};

const getTeamById = async (id) => {};

const removeTeam = async (id) => {};

const moveTeam = async (id, newCity, newState, newStadium) => {};
