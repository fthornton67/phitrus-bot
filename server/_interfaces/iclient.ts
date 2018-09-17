import { Document, Schema, Model, model,Types} from "mongoose";

export interface IClient extends Document {
  clientId?: String ,
  clientSecret?:  String ,
  redirectUris?: Array<String> 
   }
