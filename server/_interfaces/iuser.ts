import { Document, Schema, Model, model,Types} from "mongoose";

export interface IUser extends Document {
  email?: String;
  firstName?: String;
  lastName?: String;
  password?: String;
  phone?:String;
  roles?:Array<String>;
  username?:String;
  exp?:Date;
  createdAt?:Date;
}