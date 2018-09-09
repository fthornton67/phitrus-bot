import { Request, Response, Router } from "express";
import { User } from '../models/user';
import { UserCtrl } from '../controllers/UserCtrl';

var jwt = require('jsonwebtoken');

const TokenRouter: Router = Router();

TokenRouter.post('/post', (req, res) => {
    res.json('here');
  });

export {  TokenRouter };
