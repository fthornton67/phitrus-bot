import {Document, Schema, Model} from 'mongoose';

export interface IAccount extends Document {
 amz_alx_uid?: string;
  phitr_uid?: string;
}