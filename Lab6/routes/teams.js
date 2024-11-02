// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
const express = require('express');
const router = express.Router();
const {ObjectId} = await import('mongodb');

import * as teamData from '../data/teams.js';
import * as helpers from '../helpers.js';

let validateTeamPostBody = (bodyObj) => { // either returns a valid Team created from the post body, or returns the HTTP error code to send
  if(!bodyObj.name || !bodyObj.sport || !bodyObj.yearFounded || !bodyObj.city || !bodyObj.state || !bodyObj.stadium  || !bodyObj.championshipsWon || !bodyObj.players) throw 'Body Object cannot be used to construct a team';
}

let validateTeamPutBody = (bodyObj) => {
  if(!bodyObj.name || !bodyObj.sport || !bodyObj.yearFounded || !bodyObj.city || !bodyObj.state || !bodyObj.stadium  || !bodyObj.championshipsWon || !bodyObj.players) throw 'Body Object cannot be used to construct a team';
}

router
  .route('/')
  .get(async (req, res) => {
    await res.json(await teamData.getAllTeams())
  })
  .post(async (req, res) => {
    try{
      let body = JSON.parse(req.body)
      validateTeamPostBody(body)
      let newTeam = await teamData.createTeam(...body)
      res.status(200).json(newTeam)

    } catch (e) {
      res.status(400)
    }
    
    
  });

router
  .route('/:teamId')
  .get(async (req, res) => {
    let teamIDTrim;
    try {
      helpers.assertStr(req.params.teamID, "Team ID")
      teamIDTrim = req.params.teamID.trim()
      if(!ObjectId.isValid(teamIDTrim)) throw `${req.params.teamID} is not a valid ObjectID`;
    } catch (e) {
      res.status(400)
      return
    }

    try {
      let team = await teamData.getTeamById(teamIDTrim)
      res.status(200).json(team)
    } catch (e) {
      res.status(404)
      return
    }
  })

  .delete(async (req, res) => {
    let teamIDTrim;
    try {
      helpers.assertStr(req.params.teamID, "Team ID")
      teamIDTrim = req.params.teamID.trim()
      if(!ObjectId.isValid(teamIDTrim)) throw `${req.params.teamID} is not a valid ObjectID`;
    } catch (e) {
      res.status(400)
      return
    }

    try {
      let team = await teamData.removeTeam(teamIDTrim)
      res.status(200).json({"_id":team._id, "deleted":true})
    } catch (e) {
      res.status(404)
      return;
    }
  })

  .put(async (req, res) => {
    
    let teamIDTrim;

    try{
      helpers.assertStr(req.params.teamID, "Team ID")
      teamIDTrim = req.params.teamID.trim()
      if(!ObjectId.isValid(teamIDTrim)) throw `${req.params.teamID} is not a valid ObjectID`;
      let body = JSON.parse(req.body)
      validateTeamPutBody(body)
    } catch (e) {
      res.status(400)
      return;
    }

    try {
      let oldteam = await teamData.getTeamById(teamIDTrim)
      delete(body.games)
      delete(body.winLossCount)
      await teamData.updateTeam(...body)
      let newTeam = await teamData.getTeamById(teamIDTrim)
      return newTeam;
    } catch (e) {
      res.status(404)
      return;
    }
    
  });


export {router};