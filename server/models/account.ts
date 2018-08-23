import { Document, Schema, Model, model} from "mongoose";
import { IAccount } from "../_interfaces/iaccount";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export interface AccountModel extends IAccount, Document {
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

export const Account: Model<IAccount> = model<IAccount>("phitr_account", accountSchema);
export default Account;