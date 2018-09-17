import { Document, Schema, Model, model, Types } from "mongoose";
import { IPhitrAccount } from "../_interfaces/iphitraccount";

export interface IPhitrAccountModel extends IPhitrAccount, Document {
  fullName(): string;
}

export var PhitrAccountSchema: Schema = new Schema({
  client_id: String,
  redirect_uri: String,
  username: String,
  user_oid: String,
  response_type: String,
  state: String,
  token: String
});
PhitrAccountSchema.index({ username: 1, client_id: 1 }, { unique: true });

export const PhitrAccountModel: Model<IPhitrAccountModel> = model<IPhitrAccountModel>("phitr_account", PhitrAccountSchema);

export default PhitrAccountModel;
