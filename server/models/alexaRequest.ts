import * as mongoose from 'mongoose';

const AlexaRequestSchema = new mongoose.Schema({
  request: String
});

const AlexaRequestModel = mongoose.model('alexarequests', AlexaRequestSchema);

export default AlexaRequestModel;
