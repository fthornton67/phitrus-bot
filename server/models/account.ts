import * as mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  createdAt: Date,
  amz_alx_uid: String,
  phitr_uid: String
});
AccountSchema.index({ amz_alx_uid: 1, phitr_uid: 1}, { unique: true });


const PhitrAccount = mongoose.model('phitr_account', AccountSchema);

export default PhitrAccount;
