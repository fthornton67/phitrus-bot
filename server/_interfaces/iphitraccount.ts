import { Document, Schema, Model, model,Types} from 'mongoose';

export interface IPhitrAccount extends Document {
  amz_account_id?:String;
  email?:String;
  createdAt?:Date;
}