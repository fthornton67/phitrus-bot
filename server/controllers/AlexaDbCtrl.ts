import { AlexaRequestModel } from "../models/alexaRequests";
import PhitrDeviceModel from "../models/phitrDevice";
import { PhitrAccountModel } from "../models/PhitrAccountModel";
import BaseCtrl from "./base";

export default class AlexaDbCtrl {
  getCountAR = (req, res) => {
    return res.status(200).json("tbd");
  };

  getPhitrAccountByAlexaId = (req, res) => {};
 
  addRequest = (req,res) =>{
    
  };

  addAlexaUserId = (req, res) => {
    const phitrAccountModel = new PhitrAccountModel();
   
  };
  userHasPhitrAccount = async (req, res) => {

  };

  getDevices = (req, res) => {
  
  };
  // Insert
  insert = (req, res) => {
    const obj = new AlexaRequestModel(req.body.reqdata);
    obj.request_body = req.body.reqdata;
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        console.log("duplicate key error");
        // console.log(JSON.stringify(err));
      }
      if (err) {
        console.error(err);
      }
    });
  };
}
