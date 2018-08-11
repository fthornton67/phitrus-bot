import AlexaRequestModel from "../models/alexaRequest";
import BaseCtrl from "./base";


export default class AlexaRequestCtrl extends BaseCtrl {
  model = AlexaRequestModel;
  getCountAR = (req,res)=>{
      
      return this.getCount(req,res);
  };

  getDevices = (req,res) => {
    this.model.distinct('request.requestEnvelope.context.System.device.deviceId', (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  
  };
   // Insert
  insert = (reqData) => {
    console.log('saving request');
    const obj = new this.model(reqData);
    obj.request = reqData;
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        console.log('duplicate key error');
       // console.log(JSON.stringify(err));
      }
      if (err) {
        console.error(err);
      }
          console.log('save request complete');

      
    });
  };

}
