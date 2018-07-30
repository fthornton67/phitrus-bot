import { Request, Response, Router } from "express";

import alexaModel from '../models/alexaModel';
import BaseCtrl from './base';

class AlexaCtrl  {
phitr = (req,res) => {
      console.log(req);
      res.json(req);
  };
root = (req,res) =>{
  res.json(req);
};
};

export{ AlexaCtrl }