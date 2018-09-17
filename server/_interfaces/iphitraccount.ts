import { Document, Schema, Model, model,Types} from 'mongoose';

export interface IPhitrAccount extends Document {
    client_id?: String,
    redirect_uri?: String,
    username?:String,
    user_oid?: String,
    response_type?: String,
    state?: String,
    token?: String
}