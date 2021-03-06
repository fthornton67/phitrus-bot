import { Request, Response, Router } from "express";
import { OAuthUsersModel, IUserModel } from "../models/OAuthUsersModel";

//import * as Alexa from 'ask-sdk';
const Alexa = require("ask-sdk");
const skillBuilder = Alexa.SkillBuilders.custom();
import AlexaDbCtrl from "./AlexaDbCtrl";
const alexaDbCtrl = new AlexaDbCtrl();
const RequestLog = {
  process(handlerInput) {
   // alexaDbCtrl.insert(handlerInput);
    return;
  }
};

const PhitrGreetingHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "phitr_greeting"
    );
  },
  handle(handlerInput) {
    const speechText = "Hello World!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

const PhitrWorkoutHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "phitr_workout"
    );
  },
  handle(handlerInput) {
    const speechText = "Hello World!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("phitr workout", speechText)
      .getResponse();
  }
};
const PhitrActivityHandler = {
  canHandle(handlerInput) {
    var request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "phitr_activity" &&
      request.dialogState !== "COMPLETED"
    );
  },
  handle(handlerInput) {
    var request = handlerInput.requestEnvelope.request;
    return handlerInput.responseBuilder
      .addDelegateDirective(request.intent)
      .getResponse();
  }
};

const PhitrAccountHandler = {
  canHandle(handlerInput) {
    var request = handlerInput.requestEnvelope.request;
    var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "phitr_account" &&
      accessToken !== null &&
      request.dialogState === "COMPLETED"
    );
  },
  async handle(handlerInput) {
    var request = handlerInput.requestEnvelope;
    var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
    var hasAccount = accessToken !== undefined;
   
    console.log(hasAccount);
 
    if (hasAccount) {
      var speechText = "I have your account info ! What do you want to know?";
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard("phitr account", handlerInput.requestEnvelope.context.System.user.accessToken)
        .getResponse();
    } else {
      if (accessToken == undefined) {
        // The request did not include a token, so tell the user to link
        // accounts and return a LinkAccount card
        var speechText =
          "You must have a phitr account to get that information. " +
          "Please use the Alexa app to link your Amazon account " +
          "with your phitr Account.";

        return handlerInput.responseBuilder
          .speak(speechText)
          .withLinkAccountCard()
          .getResponse();
      }
    }
  }
};

const PhitrAccountDialogHandler = {
  canHandle(handlerInput) {
    var request = handlerInput.requestEnvelope.request;
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "phitr_account" &&
      request.dialogState !== "COMPLETED"
    );
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
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "phitr_activity"
    );
  },
  handle(handlerInput) {
    console.log(handlerInput);

    console.log("Plan My Workout - handle");
    const speechText = "Cool lets go!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("phitr workout", speechText)
      .getResponse();
  }
};

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach(item => {
    const name = filledSlots[item].name;

    if (
      filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code
    ) {
      switch (
        filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code
      ) {
        case "ER_SUCCESS_MATCH":
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved:
              filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0]
                .value.name,
            isValidated: true
          };
          break;
        case "ER_SUCCESS_NO_MATCH":
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false
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

    const speechText =
      "Hey, welcome to the Alexa phitr skill! <break time='1s'/> What's up?";
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

const PauseIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "Pause Audio";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("phitr pause", speechText)
      .getResponse();
  }
};
const ResumeIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "Resume Audio";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("phitr resume.", speechText)
      .getResponse();
  }
};
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "You can say hello to me!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {

    const speechText = "Goodbye!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
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
          PhitrAccountHandler,
          PhitrAccountDialogHandler,
          PhitrActivityHandler,
          PhitrGreetingHandler,
          PhitrWorkoutHandler,
          HelpIntentHandler,
          CompletedPhitrActivityHandler,
          CancelAndStopIntentHandler,
          SessionEndedRequestHandler
        )
        .addRequestInterceptors(RequestLog)
        .addErrorHandlers(ErrorHandler)
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
    res.status(200).send("done");
  };
}

export { AlexaCtrl };
