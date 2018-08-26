import * as mongoose from 'mongoose';

const alexaRequest = new mongoose.Schema({
  createdAt: Date,
  req_url: String,
  location: Object,
});

const AlexaRequestUrl = mongoose.model('alexa_req', alexaRequest);

export default AlexaRequestUrl;
