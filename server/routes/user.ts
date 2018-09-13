import { Request, Response, Router } from "express";
import { User } from '../models/user';
import { UserCtrl } from '../controllers/UserCtrl';

var jwt = require('jsonwebtoken');

const userRouter: Router = Router();
const userCtrl:UserCtrl = new UserCtrl();

const getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
userRouter.get('/',function(req,res){
  res.json({'action':'operationx'});
});

userRouter.post('/signin',userCtrl.login);


export { userRouter };
