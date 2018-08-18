import UserModel from "../models/user";
import BaseCtrl from "./base";

export default class UserCtrl extends BaseCtrl {
  model = UserModel;
  
}