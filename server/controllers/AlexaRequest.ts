import AlexaRequestModel from "../models/alexaRequest";
import BaseCtrl from "./base";


export default class AlexaRequestCtrl extends BaseCtrl {
  model = AlexaRequestModel;
   // Insert
  insert = (reqData) => {
    console.log('saving request');
    const obj = new this.model(reqData.body);
    obj.request = JSON.stringify(reqData.body);
    console.log(reqData.body);
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
