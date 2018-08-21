import { Document, Schema, Model, model} from "mongoose";
import { IDevice } from "../_interfaces/idevices";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export interface IDeviceModel extends IDevice, Document {
  fullName(): string;
}

export var deviceSchema: Schema = new Schema({

});

export const Device: Model<IDeviceModel> = model<IDeviceModel>("Device", deviceSchema);
export default Device;