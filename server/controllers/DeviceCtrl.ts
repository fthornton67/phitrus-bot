import DeviceModel from "../models/phitrDevice";
import BaseCtrl from "./base";
var jwt = require("jsonwebtoken");

export default class DeviceCtrl extends BaseCtrl {
  model = DeviceModel;

  add = (req, res) => {
    console.log(req.body);
    const device = new this.model(req.body);
    device.amz_alx_uid = req.body.amz_alx_uid;
    device.save();
    res.json(req.body.amz_alx_uid);
  };
  userHasPhitrAccount = (req, res) => {
    this.model.findOne({ amz_alx_uid: req.body.amz_alx_uid }, (err, user) => {
      if (err) {
        res.json(err);
      } else if (user !== null) {
        res.json(user.phitr_uid !== undefined);
      } else {
        const device = new this.model(req.body);
        device.amz_alx_uid = req.body.amz_alx_uid;
        device.save();
        res.json(false);
      }
    });
  };
}
export { DeviceCtrl };
