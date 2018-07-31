import { Request, Response, Router } from "express";
//import * as Alexa from 'ask-sdk';
const Alexa = require('ask-sdk-core');


import alexaModel from '../models/alexaModel';
import BaseCtrl from './base';

/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("welcome to phitr")
      .reprompt("welcome to phitr")
      .getResponse();
  },
};

let skill;
class AlexaCtrl  {
post = (req,res) => {if(!skill){
    skill = Alexa.skillBuilder.custom().addRequestHandlers(
          LaunchRequestHandler
        )
        .create();
  }

    skill.invoke(req.body)
      .then(function(responseBody) {
        res.json(responseBody);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send('Error during the request');
      });};
phitr = (req,res) => {
  if(!skill){
    skill = Alexa.skillBuilder.custom().addRequestHandlers(
          LaunchRequestHandler
        )
        .create();
  }

    skill.invoke(req.body)
      .then(function(responseBody) {
        res.json(responseBody);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send('Error during the request');
      });
  };
root = (req,res) =>{
  console.log(req);
  res.json(req);
  res.status(200);
};
};
const skillBuilder = Alexa.SkillBuilders.custom();
/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler
  )
  .create();
export{ AlexaCtrl }