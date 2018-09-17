import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../_interfaces/iuser";
var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 12;

export interface IUserModel extends IUser, Document {
  fullName(): string;
  comparePasswords():boolean;
}

export var OAuthUsersSchema: Schema = new Schema({
  email: { type: String, index: true, unique: true },
  phone: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  username: { type: String, index: true, unique: true },
  createdAt: Date,
  roles: [String],
  salt: String
});
OAuthUsersSchema.index({ email: 1 }, { unique: true });

OAuthUsersSchema.pre<IUser>("save", function(next) {
  this.username = this.email;
  this.roles.push("user.member");
  this.roles.push("user.trainer");
  bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS).then(hPword => {
    this.password = hPword;
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
});
OAuthUsersSchema.methods.comparePassword = (
  candidatePassword,
  pWordHash,
  callback
) => {
  console.log(candidatePassword);
  console.log(this.password);
  bcrypt.compare(candidatePassword, pWordHash, function(err, isMatch) {
    if (err) {
      console.log(JSON.stringify(err));
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
OAuthUsersSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

export const OAuthUsersModel: Model<IUserModel> = model<IUserModel>(
  "oauth_users",
  OAuthUsersSchema
);
OAuthUsersModel.on("index", error => {
  // "_id index cannot be sparse"
  console.log(error);
});
export default OAuthUsersModel;
