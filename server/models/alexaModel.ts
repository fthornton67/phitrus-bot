import * as mongoose from 'mongoose';

const AlexaSchema = new mongoose.Schema({
  botName: String,
  phone: String,
  rating: Number
});

const AlexaModel = mongoose.model('Alexa', AlexaSchema);

export default AlexaModel;
