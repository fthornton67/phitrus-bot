import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../_interfaces/iuser";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export interface IAccountModel extends IUser, Document {
}

export var accountSchema: Schema = new Schema({
  createdAt: Date,
  amz_alx_uid: String,
  phitr_uid: String
});

accountSchema.pre("save", function(next) {
this.createdAt = new Date();
  next();
  });

export const Account: Model<IAccountModel> = model<IAccountModel>("phitr_account", accountSchema);
export default Account;