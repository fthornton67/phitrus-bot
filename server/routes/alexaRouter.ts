import { Request, Response, Router } from "express";
import { AlexaCtrl } from "../controllers/AlexaCtrl";

const AlexaRouter: Router = Router();
const alexaCtrl:AlexaCtrl = new AlexaCtrl();

AlexaRouter.get("/",alexaCtrl.root);
AlexaRouter.get("/get", (request: Request, response: Response) => {

  return response.json({
    text: "Hello Alexa Get",
    title: "Greetings.",
  });
});
//https://bot.phitr.us/api/alexa/post
AlexaRouter.post("/phitr", alexaCtrl.phitr);
AlexaRouter.post("/post",alexaCtrl.post);
AlexaRouter.get("/phitr", alexaCtrl.phitr);


export { AlexaRouter };
