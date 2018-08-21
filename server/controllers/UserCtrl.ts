import UserModel from "../models/user";
import BaseCtrl from "./base";
var jwt = require('jsonwebtoken');


export default class UserCtrl extends BaseCtrl {
  model = UserModel;
  login = (req, res) => {
    console.log(req.body.username);
    this.model.findOne({ username: req.body.username }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        user.exp = ''
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {expiresIn: 3600}); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  };

}
export { UserCtrl }