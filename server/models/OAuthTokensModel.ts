import { Document, Schema, Model, model} from "mongoose";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export var  OAuthTokensSchema = new Schema({
  accessToken: { type: String },
  accessTokenExpiresOn: { type: Date },
  client : { type: Object },  // `client` and `user` are required in multiple places, for example `getAccessToken()`
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresOn: { type: Date },
  user : { type: Object },
  userId: { type: String }
});

const OAuthTokensModel:Model<Document> = model<Document>('OAuthTokens', OAuthTokensSchema);
export default OAuthTokensModel;