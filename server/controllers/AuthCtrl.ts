import { Request, Response, Router } from "express";
import { OAuthUsersModel, IUserModel } from "../models/OAuthUsersModel";
import { OAuthTokensModel, ITokenModel } from "../models/OAuthTokensModel";
import { OAuthClientsModel, IClientsModel } from "../models/OAuthClientsModel";
import {
  PhitrAccountModel,
  IPhitrAccountModel
} from "../models/PhitrAccountModel";

const OAuth2Server = require("oauth2-server");
var jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");

const oauth = new OAuth2Server({
  debug: true,
  model: {}
});

class AuthCtrl {
  authenticate = (req, res) => {
    const user = new OAuthUsersModel();
    OAuthUsersModel.findOne(
      { username: req.body.username },
      (err, user: IUserModel) => {
        if (!user) {
          return res.status(200).json("could not find user");
        }
        user.schema.methods.comparePassword(
          req.body.password,
          user.password,
          (error, isMatch) => {
            if (!isMatch) {
              return res.status(200).json("invalid credentials");
            }

            const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {
              expiresIn: 3600
            }); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
          }
        );
      }
    );
  };
  add_client = (req, res) => {
    const token = new OAuthClientsModel(req.body);
    token.save((err, client) => {
      if (err) {
        res.status(403).json(err);
      }
      res.status(200).json(client);
    });
  };

  get_clients = (req, res) => {
    OAuthClientsModel.find({}, (err, client) => {
      if (err) {
        res.status(403).json(err);
      }
      res.status(200).json(client);
    });
  };
  get_client = (req, res) => {
    console.log(req.body.clientId);
    OAuthClientsModel.find({ clientId: req.body.clientId }, (err, client) => {
      if (err) {
        res.status(403).json(err);
      }
      res.status(200).json(client);
    });
  };
  access_token = (req, res) => {
    if (req.body.grant_type === "refresh_token") {
      res.status(200).json({
        access_token: req.body.refresh_token,
        token_type: "alexa_phitr",
        expires_in: 3600,
        refresh_token: req.body.refresh_token,
        phitr_user_email: "example_value"
      });
    } else {
      res.status(200).json({
        access_token: req.body.code,
        token_type: "alexa_phitr",
        expires_in: 3600,
        refresh_token: req.body.code,
        phitr_user_email: "example_value"
      });
    }

    console.log(req.body);
  };
  client_token = (req, res) => {
    OAuthClientsModel.findOne(
      { clientId: req.body.clientId },
      (err, client: IClientsModel) => {
        if (err || client === null) {
          res.status(403).json("client:" + client);
        } else {
          client.schema.methods.compareSecret(
            req.body.clientSecret,
            client.clientSecret,
            (err, isMatch) => {
              if (err || !isMatch) {
                res.status(403).json("invalid client");
              } else if (isMatch) {
                const token = jwt.sign(
                  { client: client },
                  process.env.SECRET_TOKEN,
                  {
                    expiresIn: 3600
                  }
                ); // , { expiresIn: 10 } seconds
                res.status(200).json({ token: token });
              }
            }
          );
        }
      }
    );
  };

  verify_client = (req, res) => {
    OAuthClientsModel.findOne(
      { clientId: req.body.clientId },
      (err, client: IClientsModel) => {
        if (err || client === null) {
          res.status(403).json("client:" + client);
        } else {
          client.schema.methods.compareSecret(
            req.body.clientSecret,
            client.clientSecret,
            (err, isMatch) => {
              if (err || !isMatch) {
                res.status(403).json("invalid client");
              } else if (isMatch) {
                const token = jwt.sign(
                  { client: client },
                  process.env.SECRET_TOKEN,
                  {
                    expiresIn: 3600
                  }
                ); // , { expiresIn: 10 } seconds
                res.status(200).json({ token: token });
              }
            }
          );
        }
      }
    );
  };

  token = (req, res) => {
    const token = new OAuthTokensModel();
    token.accessToken = uuidv4();
    token.save((err, item) => {
      res.status(200).json(item);
    });
  };
  get_link_account = (req, res) => {
    var phitrAccount = new PhitrAccountModel(req.body);
    PhitrAccountModel.findOne(
      { username: req.body.username },
      (err, account) => {
        if (err) {
          res.status(403).json(err);
        } else if (account !== null) {
          res.status(200).json(account);
        } else {
          res.status(200).json("user not found");
        }
      }
    );
  };
  link_account = (req, res) => {
    req.body.token = uuidv4();

    var phitrAccount = new PhitrAccountModel(req.body);
    phitrAccount.save((err, result) => {
      if (err) {
        res.status(403).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  get_user = (req, res) => {
    res.status(200).json("done");
  };

  save_access_token = (req, res) => {
    res.status(200).json("done");
  };
  get_refresh_token = (req, res) => {
    res.status(200).json("done");
  };

  register = (req, res) => {
    const user = new OAuthUsersModel(req.body);

    user.save((err, item) => {
      if (err) {
        res.status(403).json(err);
      } else {
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {
          expiresIn: 3600
        }); // , { expiresIn: 10 } seconds
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
}

export { AuthCtrl };
