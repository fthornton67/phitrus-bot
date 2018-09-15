import {Document,Schema,Model,model, Types}  from 'mongoose';
import { IPhitrAccount } from '../_interfaces/iphitraccount';
export interface IPhitrAccountModel extends IPhitrAccount,Document {
  fullName(): string;
}

const PhitrAccountSchema:Schema = new Schema({
  createdAt: Date,
  amz_alx_uid: String,
  phitr_uid: String
});
PhitrAccountSchema.index({ amz_alx_uid: 1, phitr_uid: 1}, { unique: true });


export const PhitrAccountModel:Model<IPhitrAccountModel> = model<IPhitrAccountModel>('phitr_account', PhitrAccountSchema);

export default PhitrAccountModel;
