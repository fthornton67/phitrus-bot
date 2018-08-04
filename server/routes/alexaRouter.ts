import { Request, Response, Router } from "express";
import { AlexaCtrl } from "../controllers/AlexaCtrl";
import AlexaRequestCtrl from '../controllers/AlexaRequest';

let alexaVerifier = require('alexa-verifier'); // at the top of our file

function requestVerifier(req, res, next) {

    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        JSON.stringify(req.body),
        function verificationCallback(err) {
            if (err) {
              console.log(err);
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
                next();
            }
        }
    );
}

const AlexaRouter: Router = Router();
const alexaCtrl:AlexaCtrl = new AlexaCtrl();
const alexaRequests:AlexaRequestCtrl = new AlexaRequestCtrl();

AlexaRouter.get("/",alexaCtrl.root);
AlexaRouter.get("/get", (request: Request, response: Response) => {

  return response.json({
    text: "Hello Alexa Get",
    title: "Greetings.",
  });
});
//https://bot.phitr.us/api/alexa/post
AlexaRouter.post("/phitr", alexaCtrl.phitr);
AlexaRouter.post("/post",requestVerifier,alexaCtrl.post);
AlexaRouter.get("/phitr", alexaCtrl.phitr);
AlexaRouter.get("/all",alexaRequests.getAll);


export { AlexaRouter };
