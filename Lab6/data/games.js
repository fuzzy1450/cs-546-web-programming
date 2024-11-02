// This data file should export all functions using the ES6 standard as shown in the lecture code
const {teams} = await import("../config/mongoCollections.js");
const {ObjectId} = await import('mongodb');

import * as helpers from '../helpers.js';

let assertTeamExists = async (id)=>{
  helpers.assertStr(id, "1st Argument");
  let idTrim = id.trim();

  if(!ObjectId.isValid(idTrim)) throw `${id} is not a valid ObjectID`;

  let col = await teams();

  let res = await col.findOne({"_id" : new ObjectId(idTrim)});

  if(!res) throw `Object with id ${idTrim} not found`;
}

let assertSameSport = async (id1, id2) => {
  let t1 = id1.trim();
  let t2 = id2.trim();
  assertTeamExists(t1)
  assertTeamExists(t2)
  
  let col = await teams();

  let r1 = await col.findOne({"_id" : new ObjectId(t1)});
  let r2 = await col.findOne({"_id" : new ObjectId(t2)});

  if(r1.sport != r2.sport) throw `The two teams do not play the same sport`
}

const getTeamByGameId = async (gameId) => {
  helpers.assertStr(gameId)
  let gameIdTrim = gameId.trim()
  if(!ObjectId.isValid(gameIdTrim)) throw `${gameId} is not a valid ObjectID`;
  let col = await teams();
  let team = await col.findOne({'games._id': ObjectId(gameIdTrim)});
  if(!team) throw `No game found with ID ${gameIdTrim}`;
  return team;
}


export const createGame = async (
  teamId,
  gameDate,
  opposingTeamId,
  homeOrAway,
  finalScore,
  win
) => {
  assertTeamExists(teamId);
  assertTeamExists(opposingTeamId);
  
  let newGame = helpers.createValidGame(teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win)

  newGame.opposingTeamId = new ObjectId(opposingTeamId.trim())

  let teamIdTrim = teamId.trim()

  
  newGame["_id"] = new ObjectId();

  let col = await teams();
  let oldTeam = await col.findOne({_id: ObjectId(teamIdTrim)});
  let WLR = oldTeam.winLossCount.split("-")
  win ? WLR[0]=`${parseInt(WLR[0])+1}` : WLR[1]=`${parseInt(WLR[1])+1}`



  await col.updateOne({_id: ObjectId(teamIdTrim)}, {$push: {games: newGame}, $set:{winLossCount: WLR.join('-')}})
  return await col.findOne({_id: ObjectId(teamIdTrim)});
};

export const getAllGames = async (teamId) => {
  assertTeamExists(teamId);

  let col = await teams();
  let team = await col.findOne({_id: ObjectId(teamId.trim())});

  return team.games;
};

export const getGame = async (gameId) => {
  helpers.assertStr(gameId)
  let gameIdTrim = gameId.trim()
  if(!ObjectId.isValid(gameIdTrim)) throw `${gameId} is not a valid ObjectID`;
  let col = await teams();
  let game = await col.findOne({'games._id': ObjectId(gameIdTrim)}, {projection: {'games.$': 1}});
  if(!game) throw `No game found with ID ${gameIdTrim}`;
  return game;
};

export const updateGame = async (gameId, updateObject) => {
  helpers.assertStr(gameID);
  let gameIdTrim = gameId;
  let oldGame = getGame(gameIdTrim); // this does data validation for us :)

  helpers.assertObject(updateObject, "updateObject")
  let n = 0
  for(let i in updateObject) n++;
  if (n==0) throw `updateObject cannot be empty`;
  validatePartialGame(updateObject)

  let team = await getTeamByGameId(gameIdTrim);

  if(updateObject.opposingTeamId) {
    assertTeamExists(updateObject.opposingTeamId, "Opposing Team ID");
    assertSameSport(team["_id"], updateObject.opposingTeamId)
  }

  let WLR = team.winLossCount.split("-")
  if((typeof updateObject.win) == 'boolean') {
    if(updateObject.win && !oldGame.win) {
      WLR[0]=`${parseInt(WLR[0])+1}`
      WLR[1]=`${parseInt(WLR[1])-1}`
    } 
    else if (!updateObject.win && oldGame.win) {
      WLR[0]=`${parseInt(WLR[0])-1}`
      WLR[1]=`${parseInt(WLR[1])+1}`
    }
  } 

  let col = await teams();
  await col.updateOne({"games._id": ObjectId(gameIdTrim)}, {$set: {'games.$': {...updateObject, _id: ObjectId(gameIdTrim)}, winLossCount: WLR.join('-')}})
  
};

export const removeGame = async (gameId) => {
  helpers.assertStr(gameID);
  gameIdTrim = gameId.trim();

  let col = await teams();
  let oldGame = await getGame(gameIdTrim);
  let team = await getTeamByGameId(gameIdTrim);
  

  let WLR = team.winLossCount.split("-")
  oldGame.win ? WLR[0]=`${parseInt(WLR[0])-1}` : WLR[1]=`${parseInt(WLR[1])-1}`


  await col.updateOne({"games._id": ObjectId(gameIdTrim)}, {$pull: {'games': {_id: ObjectId(gameIdTrim)}, winLossCount: WLR.join('-')}})

  return await col.findOne({"_id": ObjectId(team._id)})
};
