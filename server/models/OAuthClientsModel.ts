import { Document, Schema, Model, model } from "mongoose";
import { IClient } from "../_interfaces/iclient";

var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 12;


export interface IClientsModel extends IClient, Document {
  fullName(): string;
}

const OAuthClientsSchema = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array }
});

OAuthClientsSchema.index({ clientId: 1 }, { unique: true });


OAuthClientsSchema.pre<IClient>("save", function(next) {
  bcrypt.hash(this.clientSecret, BCRYPT_SALT_ROUNDS).then(hPword => {
    this.clientSecret = hPword;
    next();
  });
});

OAuthClientsSchema.methods.compareSecret = (
  candidateSecret,
  secretHash,
  callback
) => {
  console.log(candidateSecret);
  console.log(secretHash);
  bcrypt.compare(candidateSecret, secretHash, function(err, isMatch) {
    console.log(isMatch);
    if (err) {
      console.log(JSON.stringify(err));
      return callback(err);
    }
    callback(null, isMatch);
  });
};

export const OAuthClientsModel: Model<IClientsModel> = model<IClientsModel>(
  "oauth_clients",
  OAuthClientsSchema
);

OAuthClientsModel.on("index", error => {
  // "_id index cannot be sparse"
  console.log(error);
});

export default OAuthClientsModel;
