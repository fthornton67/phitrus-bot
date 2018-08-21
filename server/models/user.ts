import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../_interfaces/iuser";
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export var userSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  phone: String,
  roles:[],
  salt: String
});

userSchema.pre("save", function(next) {
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
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

userSchema.methods.fullName = function(): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);
export default User;