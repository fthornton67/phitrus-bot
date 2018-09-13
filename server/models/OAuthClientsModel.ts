import { Document, Schema, Model, model} from "mongoose";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

const OAuthClientsSchema = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array }
});

const OAuthClientsModel:Model<Document> = model<Document>('OAuthClients', OAuthClientsSchema);

export default OAuthClientsModel;