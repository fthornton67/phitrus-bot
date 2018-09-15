import { Document, Schema, Model, model,Types} from "mongoose";

export interface IRequest extends Document {
  request_url?:String;
  request_body?:Schema.Types.Mixed;
  createdAt?:Date;
}