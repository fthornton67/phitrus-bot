import { Request, Response, Router } from "express";
import { AlexaCtrl } from "../controllers/AlexaCtrl";
import AlexaDbCtrl from '../controllers/AlexaDbCtrl';
import AlexaRequestUrl from '../models/alexaRequests';

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
const alexaDbCtrl:AlexaDbCtrl = new AlexaDbCtrl();

AlexaRouter.get("/",alexaCtrl.root);

//https://bot.phitr.us/api/alexa/post
AlexaRouter.post("/phitr", alexaCtrl.phitr);
AlexaRouter.post("/post",requestVerifier,alexaCtrl.post);
AlexaRouter.get("/phitr", alexaCtrl.phitr);
AlexaRouter.get("/all",alexaDbCtrl.getAll);
AlexaRouter.get("/count",alexaDbCtrl.count);
AlexaRouter.get("/countar",alexaDbCtrl.getCountAR);
AlexaRouter.get("/devices",alexaDbCtrl.getDevices);
AlexaRouter.get('/test',(req,res)=>{
    res.json('done');
});
AlexaRouter.post('/reqUrl',(req,res)=>{
    var item = new AlexaRequestUrl();
    item.req_url = req.body['url'];
    item.location = req.body['location'];
    item.save((err,item)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(item);
        }
    })

});




export { AlexaRouter };
