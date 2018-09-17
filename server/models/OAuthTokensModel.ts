import { Document, Schema, Model, model } from "mongoose";
import { IToken } from "../_interfaces/itoken";

var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 12;

export interface ITokenModel extends IToken {
  fullName(): string;
}
export var OAuthTokensSchema = new Schema({
  accessToken: { type: String },
  accessTokenExpiresOn: { type: Date },
  client: { type: Object }, // `client` and `user` are required in multiple places, for example `getAccessToken()`
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresOn: { type: Date },
  user: { type: Object },
  userId: { type: String }
});
OAuthTokensSchema.pre<IToken>("save", function(next) {
var dateObj = Date.now();
dateObj += 1000 * 60 * 60 * 3;
var accessExpires = new Date(dateObj);
dateObj += 1000 * 60 * 60 * 24 * 3;

var refreshExpires = new Date(dateObj);
this.clientId = '5d02aac6-b603-47a2-87b5-ab9449643565'

    if (!this.accessTokenExpiresOn) {
      this.accessTokenExpiresOn = accessExpires;
    }
    if (!this.refreshTokenExpiresOn) {
      this.refreshTokenExpiresOn = refreshExpires;
    }
    next();
});
OAuthTokensSchema.index({ accessToken: 1 }, { unique: true });


export const OAuthTokensModel: Model<ITokenModel> = model<ITokenModel>(
  "oauth_tokens",
  OAuthTokensSchema
);
export default OAuthTokensModel;
