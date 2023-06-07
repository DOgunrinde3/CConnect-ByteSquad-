import {UserModel} from "./user.model";

export class UserLoginModel{
  username: number | null
  password: string;
  companyCode: number | null
  userInfo: UserModel
}
