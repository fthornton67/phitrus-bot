import * as mongoose from 'mongoose';

const AlexaRequestSchema = new mongoose.Schema({
  botName: String,
  phone: String,
  rating: Number
});

const AlexaRequestModel = mongoose.model('Alexa', AlexaRequestSchema);

export default AlexaRequestModel;
