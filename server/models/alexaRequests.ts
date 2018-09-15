import { Document, Schema, Model, model,Types} from "mongoose";
import { IRequest } from '../_interfaces/irequest';

export interface IRequestModel extends IRequest,Document {

}

const RequestSchema:Schema = new Schema({
 request_url:String,
 request_body:Object
});

export const AlexaRequestModel:Model<IRequestModel> = model<IRequestModel>('alexa_req', RequestSchema);

export default AlexaRequestModel;
