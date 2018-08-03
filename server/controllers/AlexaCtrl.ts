import { Request, Response, Router } from "express";
//import * as Alexa from 'ask-sdk';
const Alexa = require("ask-sdk");
const skillBuilder = Alexa.SkillBuilders.custom();

import alexaModel from "../models/alexaModel";
import BaseCtrl from "./base";

const PhitrGreetingHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'phitr_greeting';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';
return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const PhitrWorkoutHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'phitr_workout';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';
return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('phitr workout', speechText)
            .getResponse();
    }
};
const PhitrActivityHandler = {
  
    canHandle(handlerInput) {
      var request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'phitr_activity'
            && request.dialogState !== 'COMPLETED';
    },
    handle(handlerInput) {
      var request = handlerInput.requestEnvelope.request;

  return handlerInput.responseBuilder
      .addDelegateDirective(request.intent)
      .getResponse();
}

};


const CompletedPhitrActivityHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' 
    && request.intent.name === 'phitr_activity'
    && request.intent.dialogState ==='COMPLETED';
  },
  handle(handlerInput) {
    console.log('Plan My Workout - handle');
           const speechText = 'Cool lets go!';
return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('phitr workout', speechText)
            .getResponse();

  }
}

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);

  return slotValues;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "Hey, welcome to the Alexa phitr skill! <break time='1s'/> What\'s up?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(".: phitr | us :.", speechText)
      .getResponse();
  }
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';
return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  }
};
let skill;
class AlexaCtrl {
  post = (req, res) => {
    if (!skill) {
      skill = skillBuilder
        .addRequestHandlers(
          LaunchRequestHandler,
          PhitrActivityHandler,
          PhitrGreetingHandler,
          PhitrWorkoutHandler,
          HelpIntentHandler,
          CompletedPhitrActivityHandler,
          CancelAndStopIntentHandler,
          SessionEndedRequestHandler
        ).addErrorHandlers(ErrorHandler)

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

export { AlexaCtrl };
