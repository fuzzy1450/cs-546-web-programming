/*



*/

import * as teams from './data/teams.js';
import * as helpers from './helpers.js';

const {ObjectId} = await import('mongodb');

// Create a team of your choice.
let the_kings = [{firstName:"Buck",lastName:"Bokai",position:"3B"}]
let kings = await teams.createTeam("London Kings", "Baseball", 2015, "London", "NC", "Battersea Stadium", 7, the_kings);

// Log the newly created team. (Just that team, not all teams)
console.log(kings)


// Create another team of your choice.
let the_niners = [
    {firstName:"Benjamin",lastName:"Sisko",position:"2B"}, 
    {firstName:"Doctor",lastName:"Bashir",position:"LF"}, 
    {firstName:"Jake",lastName:"Sisko",position:"P"}, 
    {firstName:"Worf",lastName:"son of Mogh",position:"1B"}, 
    {firstName:"Kira",lastName:"Nerys",position:"SS"}, 
    {firstName:"Kasidy",lastName:"Yates",position:"3B"}, 
    {firstName:"Ezri",lastName:"Dax",position:"CF"}
];
let niners = await teams.createTeam("The Niners", "Baseball", 1998, "Deep Space Nine", "CA", "Holosuite Stadium", 1, the_niners);

// Query all team, and log them all
let all_teams = await teams.getAllTeams();
console.log(all_teams);


// Create the 3rd team of your choice.
let the_mesopotamians = [
    {firstName:"Doctor",lastName:"Worm",position:"Drums"}, 
    {firstName:"Rabbi",lastName:"Vole",position:"Guitar"}, 
    {firstName:"Sargon",lastName:"II",position:"Guitar"}, 
    {firstName:"Hamurabi",lastName:"Code",position:"Guitar"}, 
    {firstName:"Ashurbanipal",lastName:"of Assyria",position:"Drums"}, 
    {firstName:"Gilgamesh",lastName:"of Uruk",position:"Guitar"}
];
let mesopotamians = await teams.createTeam("The Mesopotamians", "Baseball?", 1850, "Brooklyn", "NY", "Madison Square Garden", 0, the_niners);

// Log the newly created 3rd team. (Just that team, not all team)
console.log(mesopotamians);



// Move the first team
kings = await teams.moveTeam(kings._id, "Deep Space Nine", "CA", "Holosuite Stadium");


// Log the first team with the updated info. 
console.log(kings)


// Remove the second team you created.
let kill = await teams.removeTeam(niners._id);

// Query all teams, and log them all
let all_teams_again = await teams.getAllTeams();
console.log(all_teams_again);


// Try to create a team with bad input parameters to make sure it throws errors.
let the_fakes = [
    {firstName:"John",lastName:"Smith",position:"Standing Up"}, 
    {firstName:"Dullahan",lastName:"McCallagar",position:"CEO"}
]
try {
    let the_fakers = await teams.createTeam("The Fakers", "NotEven A Sport", 1858, "The Moon", "PA", "sandlot", -1, the_fakes);
    console.error("createTeam failed to throw error");
} catch (e) {
    console.log("Team Creation Failed:")
    console.log(e);
}


// Try to remove a team that does not exist to make sure it throws errors.
try {
    let already_dead = await teams.removeTeam(niners._id);
    console.error("removeTeam failed to throw error");
} catch (e) {
    console.log("Team Removal Failed:")
    console.log(e);
}

// Try to rename (move?) a team that does not exist to make sure it throws errors.
try {
    let already_dead = await teams.moveTeam(niners._id, "Earth", "NY", "The Park");
    console.error("moveTeam failed to throw error");
} catch (e) {
    console.log("Team Moving Failed:")
    console.log(e);
}

// Try to rename a team passing in invalid data to make sure it throws errors.
try {
    let not_a_real_state = await teams.moveTeam(kings._id, "Earth", "ST", "The Park");
    console.error("moveTeam failed to throw error");
} catch (e) {
    console.log("Team Moving Failed:")
    console.log(e);
}

// Try getting a team by ID that does not exist to make sure it throws errors.
try {
    let removed_team = await teams.getTeamById(niners._id);
    console.error("getTeamById failed to throw error");
} catch (e) {
    console.log("Getting Team By ID Failed:")
    console.log(e);
}
