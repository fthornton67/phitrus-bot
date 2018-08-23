import AlexaDbRequestModel from "../models/alexaDbRequest";
import PhitrDeviceModel from '../models/phitrDevice';
import PhitrAccount from '../models/account';
import BaseCtrl from "./base";


export default class AlexaDbCtrl extends BaseCtrl {
  model = AlexaDbRequestModel;
  deviceModel = PhitrDeviceModel;
  phitrAccount = PhitrAccount;

  getCountAR = (req,res)=>{
      
      return this.getCount(req,res);
  };
  
  getPhitrAccountByAlexaId = (req,res)=>{

  };
  addAlexaUserId = (userId)=>{
    const acct = new this.phitrAccount({'amz_alx_uid':userId});
    acct.save((err,user)=>{
      if(err){
        console.log(err);
      }else{
        console.log(user);
        return user;
      }
    },function(err){
      console.log(err);
    });
  }
  userHasPhitrAccount = async (userId)=>{ 
    this.phitrAccount.findOne({'amz_alx_uid':userId},function(err,user){
      if(!user){
        var createdUser = this.addAlexaUserId(this.userId);
        return createdUser.phitr_uid!== undefined;
      }
      
      return user.phitr_uid != undefined;
    }.bind(this));
      
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
