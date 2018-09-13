import { Document, Schema, Model, model} from "mongoose";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;


export var OAuthUsersSchema = new Schema({
  email: { type: String, default: '' },
  phone: { type: String},
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  username: { type: String },
  createdAt: Date,
  roles:[],
  salt: String
});

OAuthUsersSchema.pre('save', function(next) {
  this.username = this.email;
this.roles = ['user.member','user.trainer'];
bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS).then((hPword)=>{ 
  console.log(this.password); console.log(hPword);
  this.password = hPword;
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
  });
});
OAuthUsersSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
OAuthUsersSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

export const OAuthUsersModel:Model<Document> = model<Document>('OAuthUsers', OAuthUsersSchema);

export default OAuthUsersModel;