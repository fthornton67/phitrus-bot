import { Request, Response, Router } from "express";
import * as UserModel from '../models/user';
var jwt = require('jsonwebtoken');

const userRouter: Router = Router();


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
userRouter.get('/test',function(req,res){
  res.json('done');
});
userRouter.post('/signup', function(req, res) {
 res.json('done');
});
userRouter.post('/signin', function(req, res) {

  res.json('done');
});


export { userRouter };
