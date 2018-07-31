import { Request, Response, Router } from "express";
//import * as Alexa from 'ask-sdk';
const Alexa = require("ask-sdk-core");

import alexaModel from "../models/alexaModel";
import BaseCtrl from "./base";

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

let skill;
class AlexaCtrl {
  post = (req, res) => {
    console.log("hit post handler");
    if (!skill) {
      console.log('create skill');

      skill = Alexa.skillBuilder
        .custom()
        .addRequestHandlers(LaunchRequestHandler)
        .create();
    }
    skill.invoke(req.body)
      .then(function(responseBody) {
        console.log(responseBody);
        res.json(responseBody);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send("Error during the request");
      });
  };
  phitr = (req, res) => {
    if (!skill) {
      skill = Alexa.skillBuilder
        .custom()
        .addRequestHandlers(LaunchRequestHandler)
        .create();
    }

    skill
      .invoke(req.body)
      .then(function(responseBody) {
        res.json(responseBody);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send("Error during the request");
      });
  };
  root = (req, res) => {
    console.log(req);
    res.json(req);
    res.status(200);
  };
}
const skillBuilder = Alexa.SkillBuilders.custom();
/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(LaunchRequestHandler)
  .create();
export { AlexaCtrl };
