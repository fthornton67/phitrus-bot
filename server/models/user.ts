import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../_interfaces/iuser";
var bcrypt = require('bcrypt');
var salt;
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export var UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  phone: String,
  salt: String
});
UserSchema.pre("save", function(next) {
  console.log(this.password);
  var salt = bcrypt.genSalt(saltRounds, function(err, salt) {
if(err){
  console.log(err);
}else{
  this.salt = salt;
  console.log(this.salt);
  console.log(salt);

}
  
});
console.log(salt);
bcrypt.hash(this.password, salt, (err, hash) => {
      if(err){
        console.log(err);
      }
      console.log(hash);
      console.log(this.password);
        this.password = hash;
    });

  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
UserSchema.methods.fullName = function(): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
export default User;