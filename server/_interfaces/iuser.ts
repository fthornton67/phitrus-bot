import {Document, Schema, Model} from 'mongoose';

export interface IUser extends Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?:string;
  roles?:[string]
}