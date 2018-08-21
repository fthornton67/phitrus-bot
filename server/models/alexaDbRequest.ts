import * as mongoose from 'mongoose';

const AlexaDbSchema = new mongoose.Schema({
  createdAt: Date,
  request: Object
});

const AlexaDbRequestModel = mongoose.model('alexarequests', AlexaDbSchema);

export default AlexaDbRequestModel;
