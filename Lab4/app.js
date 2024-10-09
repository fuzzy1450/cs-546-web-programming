/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that does not exist to make sure it throws errors.

*/

import * as teams from './data/teams.js';
import * as helpers from './helpers.js';

const {ObjectId} = await import('mongodb');

let yanks = await teams.createTeam("Yankees", "Baseball", 1980, "Washington", "NY", "Madison", 100, [{firstName:"Derek",lastName:"Jeter",position:"The Guy"}]);
let id = yanks._id;
console.log(yanks)

const allTeams = await teams.getAllTeams();

console.log(allTeams);

let found = await teams.getTeamById(id);

console.log(found);

let kill = await teams.removeTeam(id);

console.log(kill);
