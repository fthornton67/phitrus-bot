import * as mongoose from 'mongoose';

const AlexaRequestSchema = new mongoose.Schema({
  request: Object
});

const AlexaRequestModel = mongoose.model('alexarequests', AlexaRequestSchema);

export default AlexaRequestModel;
