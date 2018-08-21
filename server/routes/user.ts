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
userRouter.get('/test',function(req,res){
  res.json('done');
});
userRouter.post('/signup', function(req, res) {
  const user = new User(req.body);
  
  user.save((err,item)=>{
    if(err){
      res.json(err);
    }else{
      res.json(item);
    }
  });
});
userRouter.post('/signin',userCtrl.login);


export { userRouter };
