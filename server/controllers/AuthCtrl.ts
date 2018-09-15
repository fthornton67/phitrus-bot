import { Request, Response, Router } from "express";
import { OAuthUsersModel,IUserModel } from "../models/OAuthUsersModel";
const OAuth2Server = require("oauth2-server");
var jwt = require('jsonwebtoken');

const oauth = new OAuth2Server({
  debug: true,
  model:{}
});

class AuthCtrl {
  
  authenticate = (req, res) => {
    const user = new OAuthUsersModel();
    OAuthUsersModel.findOne({ username: req.body.username }, (err, user:IUserModel) => {
      if (!user) { return res.status(200).json('could not find user'); }
      user.schema.methods.comparePassword(req.body.password,user.password, (error, isMatch) => {
        if (!isMatch) { return res.status(200).json('invalid credentials'); }
        
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {expiresIn: 3600}); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  };

  get_user = (req,res) => {
    res.status(200).json('done');
  }
  get_client = (req,res) => {
    res.status(200).json('done');
  }
  save_access_token = (req,res) => {
    res.status(200).json('done');
  }
  get_refresh_token = (req,res) => {
    res.status(200).json('done');
  }
  
  

  register = (req, res) => {
    const user = new OAuthUsersModel(req.body);

    user.save((err, item) => {
      if (err) {
        res.status(403).json(err);
      } else {
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {expiresIn: 3600}); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      }
    });
  };
  test = (req, res) => {
    console.log(oauth.model);
    res.status(200).json("done");
  };
  authorize = (req, res) => {
    console.log(req);
    res.send(200).json("authorize");
  };
  access_token = (req, res) => {
    console.log(req);
    res.send(200).json("access_token");
  };
}

export { AuthCtrl };
