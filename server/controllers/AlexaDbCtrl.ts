import AlexaDbRequestModel from "../models/alexaDbRequest";
import PhitrDeviceModel from '../models/phitrDevice';
import Account from '../models/account';
import BaseCtrl from "./base";


export default class AlexaDbCtrl extends BaseCtrl {
  model = AlexaDbRequestModel;
  deviceModel = PhitrDeviceModel;
  accountModel = Account

  getCountAR = (req,res)=>{
      
      return this.getCount(req,res);
  };
  
  getPhitrAccountByAlexaId = (req,res)=>{

  };
  userHasPhitrAccount = async (userId)=>{ 
    return this.deviceModel.findOne({'amz_alx_uid':userId}).exec()
  };

  getDevices = (req,res) => {
    this.model.distinct('request.requestEnvelope.context.System.device.deviceId', (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  
  };
   // Insert
  insert = (reqData) => {
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

      
    });
  };

}
