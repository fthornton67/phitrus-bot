import { Document, Schema, Model, model} from "mongoose";
import { IDevice } from "../_interfaces/idevices";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export interface IPhitrDeviceModel extends IDevice, Document {
  fullName(): string;
}

export var deviceSchema: Schema = new Schema({
  amz_alx_uid: String,
  phitr_uid: String

});

export const Device: Model<IPhitrDeviceModel> = model<IPhitrDeviceModel>("Phitr_device", deviceSchema);
export default Device;