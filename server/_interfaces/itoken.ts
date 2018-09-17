import { Document, Schema, Model, model,Types} from "mongoose";

export interface IToken extends Document {
  accessToken?: String 
  accessTokenExpiresOn?: Date 
  client ?: Object   // `client` and `user` are required in multiple places, for example `getAccessToken()`
  clientId?: String 
  refreshToken?: String 
  refreshTokenExpiresOn?: Date 
  user ?: Object 
  userId?: String
   }
